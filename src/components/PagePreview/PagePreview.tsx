import { useEffect, useState } from 'react';
import {
  executeGraphWorkflow,
  resumeGraphWorkflow,
} from './lib/workflowExecution';
import { FormModal } from './FormModal';
import type { FormDefinition } from './lib/types';

interface PagePreviewProps {
  workflowName: string;
  activeRowsData?: Record<string, any>[] | null;
  prePopulatedData?: Record<string, string>;
  parameterMapping?: Record<string, string>;
  crudServiceUrl?: string;
  token: string;
  apiKey?: string;
  handleShowNotification?: (message: string, type: 'success' | 'error') => void;
}

export function PagePreview({
  workflowName,
  activeRowsData = null,
  prePopulatedData = {},
  parameterMapping = {},
  handleShowNotification = (message: string, type: 'success' | 'error') => {},
  crudServiceUrl = 'https://crud.ocg.labs.empowernow.ai',
  token,
  apiKey,
}: PagePreviewProps) {
  const [_prePopulatedData, setPrePopulatedData] =
    useState<Record<string, string>>(prePopulatedData);

  const [activeForm, setActiveForm] = useState<{
    form: FormDefinition;
    currentTaskId: string | null;
  } | null>(null);

  useEffect(() => {
    if (workflowName) {
      startGraphWorkflow(workflowName, activeRowsData);
    }
  }, [workflowName, activeRowsData]);

  const startGraphWorkflow = async (workflowName: string, data: any) => {
    try {
      const response = await executeGraphWorkflow(
        workflowName,
        data,
        crudServiceUrl,
        token,
        apiKey
      );
      const workflowStatus = response?.status;
      const currentTaskId = response?.result?.workflow?.current_task?.id;
      const userCanResume =
        response?.result?.workflow?.current_task?.current_user_can_resume;
      const workflowForm = response?.result?.form;
      const workflowMessage = response?.message;
      handleRunWorkflow(
        workflowStatus,
        workflowForm,
        userCanResume,
        currentTaskId,
        workflowMessage
      );
    } catch (error) {
      handleShowNotification(
        error instanceof Error ? error.message : 'Action failed',
        'error'
      );
    }
  };
  const resumeWorkflow = async (data: any, currentTaskId: string | null) => {
    try {
      const response = await resumeGraphWorkflow(
        currentTaskId,
        data,
        crudServiceUrl,
        token,
        apiKey
      );
      const workflowStatus = response?.status;
      const newTaskId = response?.result.workflow?.current_task?.id;
      const userCanResume =
        response?.result?.workflow?.current_task?.current_user_can_resume;
      const workflowForm = response.result?.form;
      const workflowMessage = response?.message;
      handleRunWorkflow(
        workflowStatus,
        workflowForm,
        userCanResume,
        newTaskId,
        workflowMessage
      );
    } catch (error) {
      handleShowNotification(
        error instanceof Error ? error.message : 'Action failed',
        'error'
      );
    }
  };
  const handleRunWorkflow = (
    workflowStatus: string,
    form: any,
    userCanResume: boolean,
    currentTaskId: string,
    workflowMessage?: string
  ) => {
    if (workflowStatus === 'COMPLETED') {
      setActiveForm(null);
      handleShowNotification(
        workflowMessage?.trim() ? workflowMessage : 'Workflow Completed',
        'success'
      );
      return;
    }

    if (workflowStatus === 'ERROR') {
      setActiveForm(null);
      handleShowNotification(
        workflowMessage?.trim() ? workflowMessage : 'Workflow Error',
        'error'
      );
      return;
    }

    if (userCanResume === false) {
      setActiveForm(null);
      handleShowNotification(
        'Workflow Submitted for Approval. It can be resumed by authorized approver only',
        'success'
      );
      return;
    }

    //TODO: Check if the workflow is waiting for input
    if (workflowStatus) {
      if (form) {
        setActiveForm({
          form: form.schema,
          currentTaskId: currentTaskId,
        });
        if (form.initial_data) {
          setPrePopulatedData(form?.initial_data);
        }
      } else {
        handleShowNotification(`No Form returned for the Workflow `, 'error');
      }
      return;
    }

    setActiveForm(null);
    handleShowNotification(
      `No Action defined for Workflow Status : ${workflowStatus}`,
      'error'
    );
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold text-center text-red-500'>
        This is the Web Component for Page Preview
      </h1>
      {/* Form Modal */}
      {activeForm && (
        <FormModal
          form={activeForm.form}
          initialData={
            activeRowsData ? activeRowsData[activeRowsData.length - 1] : null
          }
          prePopulatedData={_prePopulatedData}
          parameterMapping={parameterMapping}
          onClose={() => setActiveForm(null)}
          onSubmit={async (data: any) => {
            if (activeForm.currentTaskId) {
              await resumeWorkflow(data, activeForm.currentTaskId);
            } else {
              await startGraphWorkflow(activeForm.form.workflowName, data);
            }
          }}
        />
      )}
    </div>
  );
}
