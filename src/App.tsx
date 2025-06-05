import './App.css';
import { PagePreview } from './components/PagePreview/PagePreview';

function App() {
  // Sample data for testing the PagePreview component
  const testWorkflowName = 'av_openldap_create_user';
  const testToken =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IndZSWZxQ2hRZElQbjZMc1pSV0VURDA2YmpxRSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5lbXBvd2VyaWFtLmNvbSIsInN1YiI6InNsYXZrby5ib3NhbmNpY0BlbXBvd2VyaWQuY29tIiwiYXVkIjoiM2ZiZWZhYzAtZDExYy00OGI4LTk0YzAtZWE1NWE0ZGYyMjkwIiwiaWF0IjoxNzQ5MTAzMjkwLCJuYmYiOjE3NDkxMDMyOTAsImV4cCI6MTc0OTEwNjg5MCwib2lkIjoiZjU2ZjkzMTAtZGY4ZC00NWU0LWFkZDEtNmM3ZTM4MjYwMDAwIiwibmFtZSI6IlNsYXZrbyBCb3NhbmNpYyIsImVtYWlsIjoiQlNsYXZrbzAxQEVtcG93ZXJJRENvbnRyYWN0b3JzLm9ubWljcm9zb2Z0Lm5ldCIsInNjcCI6Iml0c2hvcC5yZXNvdXJjZXMuYnVzaW5lc3NSb2xlcyBpdHNob3AucmVzb3VyY2VzLmFwcGxpY2F0aW9uUm9sZXMgaXRzaG9wLnJlc291cmNlcy5jYXJ0IGl0c2hvcC5yZXNvdXJjZXMubG9jYWxpemF0aW9uIGl0c2hvcC5yZXNvdXJjZXMuQXp1cmVMaWNlbnNlIGl0c2hvcC5yZXNvdXJjZXMubWFuYWdlbWVudHJvbGVzIGl0c2hvcC5yZXNvdXJjZXMuQXp1cmVSb2xlcyBpdHNob3AucmVzb3VyY2VzLnRlbmFudFN1YnNjcmlwdGlvblNlcnZpY2VzIGl0c2hvcC5yZXNvdXJjZXMuY2FydEl0ZW1zIHNub3cuV29ya2Zsb3dzIGl0c2hvcC5yZXNvdXJjZXMubG9jYXRpb25zIGl0c2hvcC5yZXNvdXJjZXMucGVvcGxlIGl0c2hvcC5yZXNvdXJjZXMuYnVzaW5lc3NGdW5jdGlvbnMgaXRzaG9wLm1zY29tbW9uIGl0c2hvcC5yZXNvdXJjZXMuc2hhcmVkZm9sZGVycyBpdHNob3AucmVzb3VyY2VzLm1haWxib3hlcyBpdHNob3AucmVzb3VyY2VzLnByb3RlY3RlZGFwcHMgaXRzaG9wLnJlc291cmNlcy5jb21wdXRlcnMgaXRzaG9wLnJlc291cmNlcy5leHRlcm5hbENyZWRlbnRpYWxzIGl0c2hvcC5yZXNvdXJjZXMuc2hhcmVQb2ludCBpdHNob3AucmVzb3VyY2VzLkF6dXJlQXBwQ3JlZGVudGlhbHMgaXRzaG9wLnJlc291cmNlcy5zaGFyZVBvaW50T25saW5lIGl0c2hvcC5yZXNvdXJjZXMuQXpMb2NhbFJpZ2h0IGl0c2hvcC5JVFNQZW9wbGVBUEkiLCJqdGkiOiIyMWU5NDA4Yy0zZWIwLTRiMDItODE1MC0yODMzNGZlNDZkYmYifQ.LZpOU7S77Wz0bZGsg3NCOJcH8F6fospvZN1oXNmN4DBXI75nttUflaqrjNCjRtbj9AHIWe2O0Uo4mbnX79hShSl1DE1JzOEODz5FNDSbXXldyIxlK9J3RNBkLiuoiEcGOko1E8RiseAQ1kp9LFQGh4r6obLGcuxrm-jM7AP7Cl7Q4E3xB8m51R1NOvxt-jt1W0gz_9Tkc7eUlwll2OyfjrbpoHmuzREtrli1ksaXTLE_2LwnRUNUrtFTTv9zD8XhI3h5cIoIfiY4D9cmmMz5hw1sEFwQB4woNlbf8VAkPcLCUtS4AvgnZU3aJxQW9KDteXbGw2b74dZzG5XgjTueHA';

  const handleShowNotification = (
    message: string,
    type: 'success' | 'error'
  ) => {
    console.log(`${type.toUpperCase()}: ${message}`);
    // You can later replace this with a proper notification system
  };

  return (
    <div className='App'>
      <h1>PagePreview Component Test</h1>
      <PagePreview
        workflowName={testWorkflowName}
        token={testToken}
        handleShowNotification={handleShowNotification}
      />
    </div>
  );
}

export default App;
