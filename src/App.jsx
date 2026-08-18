import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/* Landing */
import LandingPage from './pages/landing/LandingPage';
import InstitutionRequestPage from './pages/landing/InstitutionRequestPage';

/* Login Selector */
import LoginSelector from './pages/auth/LoginSelector';

/* Auth */
import Login             from './super-admin/auth/Login';
import ForgotPassword    from './super-admin/auth/ForgotPassword';
import VerifyEmail       from './super-admin/auth/VerifyEmail';
import CreateNewPassword from './super-admin/auth/CreateNewPassword';

/* Institution Auth */
import InstitutionLogin          from './institution/auth/InstitutionLogin';
import InstitutionForgotPassword from './institution/auth/InstitutionForgotPassword';
import InstitutionVerifyEmail    from './institution/auth/InstitutionVerifyEmail';
import InstitutionCreatePassword from './institution/auth/InstitutionCreatePassword';

/* Institution Dashboard */
import InstitutionDashboardLayout from './institution/components/layout/InstitutionDashboardLayout';
import InstitutionDashboard       from './institution/pages/dashboard/InstitutionDashboard';
import InstitutionProfile         from './institution/pages/profile/InstitutionProfile';
import InstitutionEditProfile     from './institution/pages/profile/InstitutionEditProfile';
import InstitutionNotification    from './institution/pages/notification/InstitutionNotification';
import InstitutionStudentList     from './institution/pages/students/InstitutionStudentList';
import InstitutionAddStudent      from './institution/pages/students/InstitutionAddStudent';
import InstitutionInstructorList   from './institution/pages/instructors/InstitutionInstructorList';
import InstitutionInstructorDetail from './institution/pages/instructors/InstitutionInstructorDetail';
import InstitutionInviteInstructor from './institution/pages/instructors/InstitutionInviteInstructor';
import InstitutionVerificationRequest from './institution/pages/verification/InstitutionVerificationRequest';
import InstitutionVerificationDetail  from './institution/pages/verification/InstitutionVerificationDetail';
import InstitutionCourseManagement    from './institution/pages/courses/InstitutionCourseManagement';
import InstitutionSubjectsView        from './institution/pages/courses/InstitutionSubjectsView';
import InstitutionChaptersView        from './institution/pages/courses/InstitutionChaptersView';
import InstitutionCreateCourse        from './institution/pages/courses/InstitutionCreateCourse';
import InstitutionClasses             from './institution/pages/classes/InstitutionClasses';
import InstitutionCreateClass         from './institution/pages/classes/InstitutionCreateClass';
import InstitutionAssignments         from './institution/pages/assignments/InstitutionAssignments';
import InstitutionAssignmentDetail    from './institution/pages/assignments/InstitutionAssignmentDetail';
import InstitutionSubmissionView      from './institution/pages/assignments/InstitutionSubmissionView';
import InstitutionCreateAssignment    from './institution/pages/assignments/InstitutionCreateAssignment';
import InstitutionVirtualLab          from './institution/pages/virtuallab/InstitutionVirtualLab';
import InstitutionRoleManagement      from './institution/pages/roles/InstitutionRoleManagement';
import InstitutionCreateRole          from './institution/pages/roles/InstitutionCreateRole';
import InstitutionViewPermissions     from './institution/pages/roles/InstitutionViewPermissions';
import InstitutionReports             from './institution/pages/reports/InstitutionReports';
import InstitutionReportView          from './institution/pages/reports/InstitutionReportView';
import InstitutionCertificates        from './institution/pages/certificates/InstitutionCertificates';
import InstitutionSubscription        from './institution/pages/subscription/InstitutionSubscription';
import InstitutionExplorePlans        from './institution/pages/subscription/InstitutionExplorePlans';

/* Instructor Dashboard */
import InstructorDashboardLayout      from './instructor/components/layout/InstructorDashboardLayout';
import InstructorDashboard            from './instructor/pages/dashboard/InstructorDashboard';
import InstructorMyClasses            from './instructor/pages/classes/InstructorMyClasses';
import InstructorCreateClass          from './instructor/pages/classes/InstructorCreateClass';
import InstructorClassDetail          from './instructor/pages/classes/InstructorClassDetail';
import InstructorStudentDetail        from './instructor/pages/classes/InstructorStudentDetail';
import InstructorAssignments          from './instructor/pages/assignments/InstructorAssignments';
import InstructorCreateAssignment     from './instructor/pages/assignments/InstructorCreateAssignment';
import InstructorAssignmentDetail     from './instructor/pages/assignments/InstructorAssignmentDetail';
import InstructorAssignmentView       from './instructor/pages/assignments/InstructorAssignmentView';
import InstructorResources            from './instructor/pages/resources/InstructorResources';
import InstructorUploadResource       from './instructor/pages/resources/InstructorUploadResource';
import InstructorMessages             from './instructor/pages/messages/InstructorMessages';
import InstructorProfile              from './instructor/pages/profile/InstructorProfile';
import InstructorStaticPage           from './instructor/pages/profile/InstructorStaticPage';
import InstructorNotification         from './instructor/pages/notification/InstructorNotification';
import InstructorVirtualLab           from './instructor/pages/virtuallab/InstructorVirtualLab';

/* Instructor Auth */
import InstructorSplash          from './instructor/auth/InstructorSplash';
import InstructorLogin           from './instructor/auth/InstructorLogin';
import InstructorForgotPassword  from './instructor/auth/InstructorForgotPassword';
import InstructorVerifyOTP       from './instructor/auth/InstructorVerifyOTP';
import InstructorCreatePassword  from './instructor/auth/InstructorCreatePassword';
import InstructorChooseLanguage  from './instructor/auth/InstructorChooseLanguage';
import InstructorChooseRole      from './instructor/auth/InstructorChooseRole';

/* Instructor — Institution invite flow */
import InstructorSecureInvitation      from './instructor/auth/InstructorSecureInvitation';
import InstructorInviteVerifyEmail     from './instructor/auth/InstructorInviteVerifyEmail';
import InstructorInviteCreatePassword  from './instructor/auth/InstructorInviteCreatePassword';
import InstructorCompleteRegistration  from './instructor/auth/InstructorCompleteRegistration';
import InstructorUploadDocuments       from './instructor/auth/InstructorUploadDocuments';
import InstructorUnderReview           from './instructor/auth/InstructorUnderReview';
import InstructorApproved              from './instructor/auth/InstructorApproved';

/* Instructor — Individual instructor flow */
import IndividualInstructorRegister      from './instructor/auth/IndividualInstructorRegister';
import IndividualInstructorVerifyEmail   from './instructor/auth/IndividualInstructorVerifyEmail';
import IndividualInstructorCreatePassword from './instructor/auth/IndividualInstructorCreatePassword';
import IndividualInstructorTellUs        from './instructor/auth/IndividualInstructorTellUs';
import IndividualInstructorUploadDocs    from './instructor/auth/IndividualInstructorUploadDocs';
import IndividualInstructorUnderReview   from './instructor/auth/IndividualInstructorUnderReview';
import IndividualInstructorApproved      from './instructor/auth/IndividualInstructorApproved';

/* Individual Instructor Dashboard */
import IndividualDashboardLayout from './instructor/individual/components/layout/IndividualDashboardLayout';
import IndividualDashboard       from './instructor/individual/pages/dashboard/IndividualDashboard';
import IndividualMyCourses       from './instructor/individual/pages/courses/IndividualMyCourses';
import IndividualCreatedCourse   from './instructor/individual/pages/courses/IndividualCreatedCourse';
import IndividualCourseDetail    from './instructor/individual/pages/courses/IndividualCourseDetail';
import IndividualChapters        from './instructor/individual/pages/courses/IndividualChapters';
import IndividualChapterContent  from './instructor/individual/pages/courses/IndividualChapterContent';
import IndividualStudentDetail   from './instructor/individual/pages/courses/IndividualStudentDetail';
import IndividualCreateCourse    from './instructor/individual/pages/courses/IndividualCreateCourse';
import IndividualAnnouncements   from './instructor/individual/pages/announcements/IndividualAnnouncements';
import IndividualCreateAnnouncement from './instructor/individual/pages/announcements/IndividualCreateAnnouncement';
import IndividualAssignments           from './instructor/individual/pages/assignments/IndividualAssignments';
import IndividualCreateAssignment      from './instructor/individual/pages/assignments/IndividualCreateAssignment';
import IndividualAssignmentDetail      from './instructor/individual/pages/assignments/IndividualAssignmentDetail';
import IndividualAssignmentView        from './instructor/individual/pages/assignments/IndividualAssignmentView';
import IndividualMessages              from './instructor/individual/pages/messages/IndividualMessages';
import IndividualNotification          from './instructor/individual/pages/notification/IndividualNotification';
import IndividualProfile               from './instructor/individual/pages/profile/IndividualProfile';
import IndividualProfileSubPages       from './instructor/individual/pages/profile/IndividualProfileSubPages';
import IndividualWallet                from './instructor/individual/pages/wallet/IndividualWallet';
import IndividualWithdraw              from './instructor/individual/pages/wallet/IndividualWithdraw';
import IndividualWithdrawAccount       from './instructor/individual/pages/wallet/IndividualWithdrawAccount';
import IndividualAddWithdrawalMethod   from './instructor/individual/pages/wallet/IndividualAddWithdrawalMethod';
import IndividualWalletNotification    from './instructor/individual/pages/wallet/IndividualWalletNotification';


/* Student Auth */
// import StudentSplash from './student/auth/StudentSplash'; // Not needed — uses /instructor splash
import StudentLogin           from './student/auth/StudentLogin';
import StudentForgotPassword  from './student/auth/StudentForgotPassword';
import StudentVerifyOTP       from './student/auth/StudentVerifyOTP';
import StudentCreatePassword  from './student/auth/StudentCreatePassword';
import StudentRegister        from './student/auth/StudentRegister';
import StudentRegisterOTP     from './student/auth/StudentRegisterOTP';
import StudentParentalConsent from './student/auth/StudentParentalConsent';
import StudentWaitingApproval from './student/auth/StudentWaitingApproval';
import StudentParentNotification from './student/auth/StudentParentNotification';
import StudentFreeTrial       from './student/auth/StudentFreeTrial';
import StudentWelcome         from './student/auth/StudentWelcome';

/* Student Dashboard */
import StudentDashboardLayout from './student/components/layout/StudentDashboardLayout';
import StudentDashboard       from './student/pages/dashboard/StudentDashboard';
import StudentClasses         from './student/pages/classes/StudentClasses';
import StudentAssignments     from './student/pages/assignments/StudentAssignments';
import StudentMessages        from './student/pages/messages/StudentMessages';
// import StudentVirtualLab      from './student/pages/virtuallab/StudentVirtualLab';
// import StudentProfile         from './student/pages/profile/StudentProfile';

/* Dashboard shell */
import DashboardLayout   from './super-admin/components/layout/DashboardLayout';

/* Pages */
import Dashboard         from './super-admin/pages/dashboard/Dashboard';
import AdminProfile      from './super-admin/pages/profile/AdminProfile';
import Notification      from './super-admin/pages/notification/Notification';
import NotificationsCenter  from './super-admin/pages/notification/NotificationsCenter';
import CreateNotification   from './super-admin/pages/notification/CreateNotification';
import StudentList       from './super-admin/pages/users/students/StudentList';
import AddStudent        from './super-admin/pages/users/students/AddStudent';
import InstructorList    from './super-admin/pages/users/instructor/InstructorList';
import InstructorDetail  from './super-admin/pages/users/instructor/InstructorDetail';
import InstructorCourses from './super-admin/pages/users/instructor/InstructorCourses';
import InstructorRevenue from './super-admin/pages/users/instructor/InstructorRevenue';
import AddInstructor     from './super-admin/pages/users/instructor/AddInstructor';
import InstitutionList   from './super-admin/pages/users/institution/InstitutionList';
import InstitutionDetail from './super-admin/pages/users/institution/InstitutionDetail';
import InstitutionStudents    from './super-admin/pages/users/institution/InstitutionStudents';
import InstitutionInstructors from './super-admin/pages/users/institution/InstitutionInstructors';
import AddNewInstitution from './super-admin/pages/onboarding/AddNewInstitution';

/* Course Verification */
import CourseVerification from './super-admin/pages/course-verification/CourseVerification';

/* Role Management */
import RoleManagement from './super-admin/pages/roles/RoleManagement';
import CreateRole     from './super-admin/pages/roles/CreateRole';

/* Settlements */
import Settlements from './super-admin/pages/settlement/Settlements';

/* Revenue */
import Revenue from './super-admin/pages/revenue/Revenue';

/* Virtual Lab Management */
import VirtualLabManagement from './super-admin/pages/virtuallab/VirtualLabManagement';

/* Subscription Plan */
import SubscriptionPlan        from './super-admin/pages/subscription-plan/SubscriptionPlan';
import CreateInstitutionsPlan  from './super-admin/pages/subscription-plan/CreateInstitutionsPlan';
import CreateInstructorPlan    from './super-admin/pages/subscription-plan/CreateInstructorPlan';
import CreateStudentPlan       from './super-admin/pages/subscription-plan/CreateStudentPlan';

/* New Institute Requests / Queries */
import Queries                    from './super-admin/pages/institute-request/Queries';
import InstitutionRequestDetail   from './super-admin/pages/institute-request/InstitutionRequestDetail';

/* Verification Request */
import VerificationRequest from './super-admin/pages/verification/VerificationRequest';
import InstituteDetails    from './super-admin/pages/verification/InstituteDetails';
import InstructorVerificationDetail from './super-admin/pages/verification/InstructorVerificationDetail';

/* Course Management */
import CourseManagement  from './super-admin/pages/course/CourseManagement';
import CreateCategory    from './super-admin/pages/course/CreateCategory';
import CategoryDetail    from './super-admin/pages/course/CategoryDetail';
import CreateNewCourse   from './super-admin/pages/course/CreateNewCourse';
import CoursesView       from './super-admin/pages/course/CoursesView';
import SubjectsView      from './super-admin/pages/course/SubjectsView';
import AddSubject        from './super-admin/pages/course/AddSubject';
import ChaptersView      from './super-admin/pages/course/ChaptersView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Landing Page ── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/institution/request-demo" element={<InstitutionRequestPage />} />

        {/* ── Login Selector ── */}
        <Route path="/select-login" element={<LoginSelector />} />

        {/* ── Auth ── */}
        <Route path="/login"               element={<Login />} />
        <Route path="/forgot-password"     element={<ForgotPassword />} />
        <Route path="/verify-email"        element={<VerifyEmail />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />

        {/* ── Institution Auth ── */}
        <Route path="/institution/login"           element={<InstitutionLogin />} />
        <Route path="/institution/forgot-password" element={<InstitutionForgotPassword />} />
        <Route path="/institution/verify-email"    element={<InstitutionVerifyEmail />} />
        <Route path="/institution/create-password" element={<InstitutionCreatePassword />} />

        {/* ── Institution Dashboard ── */}
        <Route path="/institution/dashboard" element={<InstitutionDashboardLayout />}>
          <Route index element={<InstitutionDashboard />} />          <Route path="profile"             element={<InstitutionProfile />} />
          <Route path="profile/edit"        element={<InstitutionEditProfile />} />
          <Route path="notification"        element={<InstitutionNotification />} />
          <Route path="students"             element={<InstitutionStudentList />} />
          <Route path="students/add"         element={<InstitutionAddStudent />} />
          <Route path="students/bulk-upload" element={<InstitutionAddStudent />} />
          <Route path="instructors"          element={<InstitutionInstructorList />} />
          <Route path="instructors/detail"   element={<InstitutionInstructorDetail />} />
          <Route path="instructors/invite"   element={<InstitutionInviteInstructor />} />
          <Route path="verification"         element={<InstitutionVerificationRequest />} />
          <Route path="verification/detail"  element={<InstitutionVerificationDetail />} />
          <Route path="courses"              element={<InstitutionCourseManagement />} />
          <Route path="courses/subjects"     element={<InstitutionSubjectsView />} />
          <Route path="courses/chapters"     element={<InstitutionChaptersView />} />
          <Route path="courses/create"       element={<InstitutionCreateCourse />} />
          <Route path="classes"              element={<InstitutionClasses />} />
          <Route path="classes/create"       element={<InstitutionCreateClass />} />
          <Route path="classes/view"         element={<InstitutionClasses />} />
          <Route path="assignments"          element={<InstitutionAssignments />} />
          <Route path="assignments/detail"   element={<InstitutionAssignmentDetail />} />
          <Route path="assignments/submission" element={<InstitutionSubmissionView />} />
          <Route path="assignments/create"   element={<InstitutionCreateAssignment />} />
          <Route path="virtuallab"           element={<InstitutionVirtualLab />} />
          <Route path="roles"                element={<InstitutionRoleManagement />} />
          <Route path="roles/create"         element={<InstitutionCreateRole />} />
          <Route path="roles/permissions"    element={<InstitutionViewPermissions />} />
          <Route path="reports"              element={<InstitutionReports />} />
          <Route path="reports/view"         element={<InstitutionReportView />} />
          <Route path="certificates"         element={<InstitutionCertificates />} />
          <Route path="subscription"         element={<InstitutionSubscription />} />
          <Route path="subscription/plans"   element={<InstitutionExplorePlans />} />
        </Route>

        {/* ── Add New Institution — super admin standalone onboarding ── */}
        <Route path="/institution/onbording" element={<AddNewInstitution />} />

        {/* ── Instructor Auth ── */}
        <Route path="/instructor"                   element={<InstructorSplash />} />
        <Route path="/instructor/login"             element={<InstructorLogin />} />
        <Route path="/instructor/forgot-password"   element={<InstructorForgotPassword />} />
        <Route path="/instructor/verify-otp"        element={<InstructorVerifyOTP />} />
        <Route path="/instructor/create-password"   element={<InstructorCreatePassword />} />
        <Route path="/instructor/choose-language"   element={<InstructorChooseLanguage />} />
        <Route path="/instructor/choose-role"       element={<InstructorChooseRole />} />

        {/* ── Instructor — Institution Invite Flow ── */}
        {/* Flow: /instructor/invite → verify-email → create-password → complete-registration → upload-documents → under-review → approved → /instructor/dashboard */}
        <Route path="/instructor/invite"                        element={<InstructorSecureInvitation />} />
        <Route path="/instructor/invite/verify-email"           element={<InstructorInviteVerifyEmail />} />
        <Route path="/instructor/invite/create-password"        element={<InstructorInviteCreatePassword />} />
        <Route path="/instructor/invite/complete-registration"  element={<InstructorCompleteRegistration />} />
        <Route path="/instructor/invite/upload-documents"       element={<InstructorUploadDocuments />} />
        <Route path="/instructor/invite/under-review"           element={<InstructorUnderReview />} />
        <Route path="/instructor/invite/approved"               element={<InstructorApproved />} />

        {/* ── Instructor — Individual Instructor Flow ── */}
        {/* Flow: choose-role → Individual Instructor → register → verify-email → create-password → tell-us-about-you → upload-documents → under-review → approved → /instructor/dashboard */}
        <Route path="/instructor/individual/register"           element={<IndividualInstructorRegister />} />
        <Route path="/instructor/individual/verify-email"       element={<IndividualInstructorVerifyEmail />} />
        <Route path="/instructor/individual/create-password"    element={<IndividualInstructorCreatePassword />} />
        <Route path="/instructor/individual/tell-us-about-you"  element={<IndividualInstructorTellUs />} />
        <Route path="/instructor/individual/upload-documents"   element={<IndividualInstructorUploadDocs />} />
        <Route path="/instructor/individual/under-review"       element={<IndividualInstructorUnderReview />} />
        <Route path="/instructor/individual/approved"           element={<IndividualInstructorApproved />} />

        {/* ── Individual Instructor Dashboard ── */}
        <Route path="/instructor/individual/dashboard" element={<IndividualDashboardLayout />}>
          <Route index element={<IndividualDashboard />} />
          {/* Courses */}
          <Route path="courses"                                                                          element={<IndividualMyCourses />} />
          <Route path="courses/create"                                                                   element={<IndividualCreateCourse />} />
          <Route path="courses/:categoryId"                                                              element={<IndividualCreatedCourse />} />
          <Route path="courses/:categoryId/:courseId"                                                    element={<IndividualCourseDetail />} />
          <Route path="courses/:categoryId/:courseId/students/:studentId"                               element={<IndividualStudentDetail />} />
          <Route path="courses/:categoryId/:courseId/students/:studentId/assignments/:assignmentId"     element={<IndividualStudentDetail />} />
          <Route path="courses/:categoryId/:courseId/chapters/:subjectId"                               element={<IndividualChapters />} />
          <Route path="courses/:categoryId/:courseId/chapters/:subjectId/:chapterId"                    element={<IndividualChapterContent />} />
          <Route path="announcements"                     element={<IndividualAnnouncements />} />
          <Route path="announcements/create"              element={<IndividualCreateAnnouncement />} />
          <Route path="announcements/:announcementId"     element={<IndividualAnnouncements />} />
          {/* Assignments */}
          <Route path="assignments"                                              element={<IndividualAssignments />} />
          <Route path="assignments/create"                                       element={<IndividualCreateAssignment />} />
          <Route path="assignments/:assignmentId"                                element={<IndividualAssignmentDetail />} />
          <Route path="assignments/:assignmentId/edit"                           element={<IndividualCreateAssignment />} />
          <Route path="assignments/:assignmentId/submissions/:submissionId"      element={<IndividualAssignmentView />} />
          {/* Messages */}
          <Route path="messages"                          element={<IndividualMessages />} />
          {/* Notification */}
          <Route path="notification"                      element={<IndividualNotification />} />
          {/* Wallet */}
          <Route path="wallet"                            element={<IndividualWallet />} />
          <Route path="wallet/withdraw"                   element={<IndividualWithdraw />} />
          <Route path="wallet/bank-details"               element={<IndividualWithdrawAccount />} />
          <Route path="wallet/add-method"                 element={<IndividualAddWithdrawalMethod />} />
          <Route path="wallet/notifications"              element={<IndividualWalletNotification />} />
          {/* Profile */}
          <Route path="profile"                           element={<IndividualProfile />} />
          <Route path="profile/:subPage"                  element={<IndividualProfileSubPages />} />
        </Route>

        {/* ── Instructor Dashboard ── */}
        <Route path="/instructor/dashboard" element={<InstructorDashboardLayout />}>
          <Route index element={<InstructorDashboard />} />

          {/* Classes */}
          <Route path="classes"                                                              element={<InstructorMyClasses />} />
          <Route path="classes/create"                                                       element={<InstructorCreateClass />} />
          <Route path="classes/:classId"                                                     element={<InstructorClassDetail />} />
          <Route path="classes/:classId/students/:studentId"                                 element={<InstructorStudentDetail />} />
          <Route path="classes/:classId/students/:studentId/assignments/:assignmentId"       element={<InstructorAssignmentView />} />
          <Route path="classes/:classId/assignments/:assignmentId"                           element={<InstructorAssignmentDetail />} />
          <Route path="classes/:classId/assignments/:assignmentId/submissions/:submissionId" element={<InstructorAssignmentView />} />

          {/* Assignments */}
          <Route path="assignments"                element={<InstructorAssignments />} />
          <Route path="assignments/create"         element={<InstructorCreateAssignment />} />
          <Route path="assignments/:assignmentId"  element={<InstructorAssignmentDetail />} />
          <Route path="assignments/:assignmentId/submissions/:submissionId" element={<InstructorAssignmentView />} />

          {/* Resources */}
          <Route path="resources"          element={<InstructorResources />} />
          <Route path="resources/upload"   element={<InstructorUploadResource />} />

          {/* Messages */}
          <Route path="messages"           element={<InstructorMessages />} />

          {/* Notification */}
          <Route path="notification"       element={<InstructorNotification />} />

          {/* Virtual Lab */}
          <Route path="virtuallab"         element={<InstructorVirtualLab />} />

          {/* Profile */}
          <Route path="profile"                    element={<InstructorProfile />} />
          <Route path="profile/:pageType"          element={<InstructorStaticPage />} />
        </Route>

        {/* ── Student Auth ── */}
        {/* Student splash same as instructor — redirect to /instructor */}
        <Route path="/student" element={<Navigate to="/instructor" replace />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/forgot-password"              element={<StudentForgotPassword />} />
        <Route path="/student/verify-otp"                   element={<StudentVerifyOTP />} />
        <Route path="/student/create-password"              element={<StudentCreatePassword />} />
        <Route path="/student/register"                     element={<StudentRegister />} />
        <Route path="/student/register/verify-otp"          element={<StudentRegisterOTP />} />
        <Route path="/student/register/parental-consent"    element={<StudentParentalConsent />} />
        <Route path="/student/register/waiting"             element={<StudentWaitingApproval />} />
        <Route path="/student/register/parent-notification" element={<StudentParentNotification />} />
        <Route path="/student/register/free-trial"          element={<StudentFreeTrial />} />
        <Route path="/student/register/welcome"             element={<StudentWelcome />} />

        {/* ── Student Dashboard ── */}
        <Route path="/student/dashboard" element={<StudentDashboardLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="classes"                   element={<StudentClasses />} />
          <Route path="classes/:classId"          element={<StudentClasses />} />
          <Route path="assignments"               element={<StudentAssignments />} />
          <Route path="assignments/:assignmentId" element={<StudentAssignments />} />
          <Route path="messages"                  element={<StudentMessages />} />
        </Route>

        {/* ── Dashboard shell ── */}
        <Route path="/dashboard" element={<DashboardLayout />}>

          {/* Dashboard home */}
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="notification" element={<NotificationsCenter />} />
          <Route path="notification/create" element={<CreateNotification />} />

          {/* ── Students ──
              GET    /dashboard/students           → StudentList
              GET    /dashboard/students/add       → AddStudent
          */}
          <Route path="students"     element={<StudentList />} />
          <Route path="students/add" element={<AddStudent />} />

          {/* ── Instructors ──
              GET    /dashboard/instructors              → InstructorList
              GET    /dashboard/instructors/add          → AddInstructor
              GET    /dashboard/instructors/:id          → InstructorDetail
              GET    /dashboard/instructors/:id/courses  → InstructorCourses
              GET    /dashboard/instructors/:id/revenue  → InstructorRevenue
          */}
          <Route path="instructors"              element={<InstructorList />} />
          <Route path="instructors/add"          element={<AddInstructor />} />
          <Route path="instructors/:id"          element={<InstructorDetail />} />
          <Route path="instructors/:id/courses"  element={<InstructorCourses />} />
          <Route path="instructors/:id/revenue"  element={<InstructorRevenue />} />

          {/* ── Institutions ──
              GET    /dashboard/institutions                    → InstitutionList
              GET    /dashboard/institutions/:id               → InstitutionDetail
              GET    /dashboard/institutions/:id/students      → InstitutionStudents
              GET    /dashboard/institutions/:id/instructors   → InstitutionInstructors
          */}
          <Route path="institutions"                  element={<InstitutionList />} />
          <Route path="institutions/:id"              element={<InstitutionDetail />} />
          <Route path="institutions/:id/students"     element={<InstitutionStudents />} />
          <Route path="institutions/:id/instructors"  element={<InstitutionInstructors />} />

          {/* ── Course Management ──
              Static routes FIRST (before dynamic :categoryId)

              GET    /dashboard/course-management                                    → CourseManagement (categories list)
              POST   /dashboard/course-management/categories/create                 → CreateCategory
              GET    /dashboard/course-management/categories/:categoryId            → CategoryDetail
              POST   /dashboard/course-management/categories/:categoryId/courses/create → CreateNewCourse
              GET    /dashboard/course-management/courses                           → CoursesView (all courses)

              Flow 1: Course → Subject → Chapter → Content  
              GET    /dashboard/course-management/courses/:courseId/subjects                    → SubjectsView
              POST   /dashboard/course-management/courses/:courseId/subjects/add               → AddSubject
              GET    /dashboard/course-management/courses/:courseId/subjects/:subjectId/chapters → ChaptersView (Flow 1)

              Flow 2: Course → Chapter → Content (no subjects)
              GET    /dashboard/course-management/courses/:courseId/chapters                    → ChaptersView (Flow 2)
          */}

          {/* Course Management — categories */}
          <Route path="course-management"
            element={<CourseManagement />} />

          <Route path="course-management/categories/create"
            element={<CreateCategory />} />

          <Route path="course-management/categories/:categoryId"
            element={<CategoryDetail />} />

          <Route path="course-management/categories/:categoryId/courses/create"
            element={<CreateNewCourse />} />

          {/* All courses view */}
          <Route path="course-management/courses"
            element={<CoursesView />} />

          {/* Flow 1: Course → Subject → Chapter → Content */}
          <Route path="course-management/courses/:courseId/subjects"
            element={<SubjectsView />} />

          <Route path="course-management/courses/:courseId/subjects/add"
            element={<AddSubject />} />

          <Route path="course-management/courses/:courseId/subjects/:subjectId/chapters"
            element={<ChaptersView />} />

          {/* Flow 2: Course → Chapter → Content (direct, no subjects) */}
          <Route path="course-management/courses/:courseId/chapters"
            element={<ChaptersView />} />

          {/* ── Course Verification ──
              GET    /dashboard/course-verification   → CourseVerification
          */}
          <Route path="course-verification" 
            element={<CourseVerification />} />

          {/* ── Role Management ──
              GET    /dashboard/role-management          → RoleManagement
              GET    /dashboard/role-management/create   → CreateRole
          */}
          <Route path="role-management"
            element={<RoleManagement />} />
          <Route path="role-management/create"
            element={<CreateRole />} />

          {/* ── Settlements ──
              GET    /dashboard/settlement   → Settlements
          */}
          <Route path="settlement"
            element={<Settlements />} />

          {/* ── Revenue ──
              GET    /dashboard/revenue   → Revenue
          */}+
          <Route path="revenue"
            element={<Revenue />} />

          {/* ── Virtual Lab Management ──
              GET    /dashboard/virtuallab   → VirtualLabManagement
          */}
          <Route path="virtuallab"
            element={<VirtualLabManagement />} />

          {/* ── Subscription Plan ──
              GET    /dashboard/subscription-plan                        → SubscriptionPlan
              GET    /dashboard/subscription-plan/create-institute       → CreateInstitutionsPlan
          */}
          <Route path="subscription-plan"
            element={<SubscriptionPlan />} />
          <Route path="subscription-plan/create-institute"
            element={<CreateInstitutionsPlan />} />
          <Route path="subscription-plan/create-instructor"
            element={<CreateInstructorPlan />} />
          <Route path="subscription-plan/create-student"
            element={<CreateStudentPlan />} />

          {/* ── New Institute Requests / Queries ──
              GET    /dashboard/institute-request          → Queries
              GET    /dashboard/institute-request/:id      → InstitutionRequestDetail
          */}
          <Route path="institute-request"
            element={<Queries />} />
          <Route path="institute-request/:id"
            element={<InstitutionRequestDetail />} />

          {/* ── Verification Request ──
              GET    /dashboard/verification              → VerificationRequest
              GET    /dashboard/verification/:id         → InstituteDetails
          */}
          <Route path="verification"
            element={<VerificationRequest />} />
          <Route path="verification/instructor/:id"
            element={<InstructorVerificationDetail />} />
          <Route path="verification/:id"
            element={<InstituteDetails />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Global fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
