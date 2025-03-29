import { Navigate, Route, Routes } from 'react-router-dom';
import { adminRoutes, appRoutes, authRoutes, InstructorRoutes, shopRoutes, studentRoutes, demosRoutes, initialRoutes } from '@/routes/index';
import AdminLayout from '@/layouts/AdminLayout';
import ShopLayout from '@/layouts/ShopLayout';
import InstructorLayout from '@/layouts/InstructorLayout';
import StudentLayout from '@/layouts/StudentLayout';
import OtherLayout from '@/layouts/OtherLayout';
import { useAuthContext } from '@/context/useAuthContext';


// const AppRouter = props => {
//   const {
//     isAuthenticated
//   } = useAuthContext();
//   return <Routes>
//       {(authRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={<OtherLayout {...props}>{route.element}</OtherLayout>} />)}
//       {(appRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={isAuthenticated ? <OtherLayout {...props}>{route.element}</OtherLayout> : <Navigate to={{
//       pathname: '/auth/sign-in',
//       search: 'redirectTo=' + route.path
//     }} />} />)}
//       {(shopRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={isAuthenticated ? <ShopLayout {...props}>{route.element}</ShopLayout> : <Navigate to={{
//       pathname: '/auth/sign-in',
//       search: 'redirectTo=' + route.path
//     }} />} />)}
//       {(InstructorRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={isAuthenticated ? <InstructorLayout {...props}>{route.element}</InstructorLayout> : <Navigate to={{
//       pathname: '/auth/sign-in',
//       search: 'redirectTo=' + route.path
//     }} />} />)}
//       {(studentRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={isAuthenticated ? <StudentLayout {...props}>{route.element}</StudentLayout> : <Navigate to={{
//       pathname: '/auth/sign-in',
//       search: 'redirectTo=' + route.path
//     }} />} />)}

//       {(adminRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={isAuthenticated ? <AdminLayout {...props}>{route.element}</AdminLayout> : <Navigate to={{
//       pathname: '/auth/sign-in',
//       search: 'redirectTo=' + route.path
//     }} />} />)}
//     </Routes>;
// };


const AppRouter = props => {
  const { isAuthenticated } = useAuthContext();
  
  return (
    <Routes>
      {/* Initial Routes */}
      {(initialRoutes || []).map((route, idx) => (
        <Route key={idx + route.name} path={route.path} element={route.element} />
      ))}

      {/* Demo Routes */}
      {(demosRoutes || []).map((route, idx) => (
        <Route key={idx + route.name} path={route.path} element={<OtherLayout {...props}>{route.element}</OtherLayout>} />
      ))}

      {/* Auth Routes */}
      {(authRoutes || []).map((route, idx) => (
        <Route key={idx + route.name} path={route.path} element={<OtherLayout {...props}>{route.element}</OtherLayout>} />
      ))}

      {/* App Routes */}
      {(appRoutes || []).map((route, idx) => (
        <Route key={idx + route.name} path={route.path} element={<OtherLayout {...props}>{route.element}</OtherLayout>} />
      ))}

      {/* Shop Routes */}
      {(shopRoutes || []).map((route, idx) => (
        <Route key={idx + route.name} path={route.path} element={<ShopLayout {...props}>{route.element}</ShopLayout>} />
      ))}

      {/* Instructor Routes */}
      {(InstructorRoutes || []).map((route, idx) => (
        <Route key={idx + route.name} path={route.path} element={<InstructorLayout {...props}>{route.element}</InstructorLayout>} />
      ))}

      {/* Student Routes */}
      {(studentRoutes || []).map((route, idx) => (
        <Route key={idx + route.name} path={route.path} element={<StudentLayout {...props}>{route.element}</StudentLayout>} />
      ))}

      {/* Admin Routes */}
      {(adminRoutes || []).map((route, idx) => (
        <Route key={idx + route.name} path={route.path} element={<AdminLayout {...props}>{route.element}</AdminLayout>} />
      ))}

      {/* Catch all route - 404 */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};




export default AppRouter;
