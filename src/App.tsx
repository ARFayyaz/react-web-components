import "./App.css";
import { PagePreview } from "./components/PagePreview/PagePreview";

function App() {
  // Sample data for testing the PagePreview component
  const testWorkflowName = "av_openldap_create_user";
  const testToken = "testToken";

  const handleShowNotification = (
    message: string,
    type: "success" | "error"
  ) => {
    console.log(`${type.toUpperCase()}: ${message}`);
    // You can later replace this with a proper notification system
  };

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-blue-600 mb-8'>
          PagePreview Component Test
        </h1>
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <PagePreview
            workflowName={testWorkflowName}
            token={testToken}
            handleShowNotification={handleShowNotification}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
