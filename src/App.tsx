import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import CustomerList from './pages/CustomerList';
import CustomerForm from './pages/CustomerForm';
import SupplierList from './pages/SupplierList';
import SupplierForm from './pages/SupplierForm';
import PhotocopierList from './pages/PhotocopierList';
import PhotocopierForm from './pages/PhotocopierForm';
import RentalList from './pages/RentalList';
import RentalForm from './pages/RentalForm';
import PaymentList from './pages/PaymentList';
import PaymentForm from './pages/PaymentForm';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            <Route path="employees" element={<EmployeeList />} />
            <Route path="employees/new" element={<EmployeeForm />} />
            <Route path="employees/edit/:id" element={<EmployeeForm />} />

            <Route path="customers" element={<CustomerList />} />
            <Route path="customers/new" element={<CustomerForm />} />
            <Route path="customers/edit/:id" element={<CustomerForm />} />

            <Route path="suppliers" element={<SupplierList />} />
            <Route path="suppliers/new" element={<SupplierForm />} />
            <Route path="suppliers/edit/:id" element={<SupplierForm />} />

            <Route path="photocopiers" element={<PhotocopierList />} />
            <Route path="photocopiers/new" element={<PhotocopierForm />} />
            <Route path="photocopiers/edit/:id" element={<PhotocopierForm />} />

            <Route path="rentals" element={<RentalList />} />
            <Route path="rentals/new" element={<RentalForm />} />
            <Route path="rentals/edit/:id" element={<RentalForm />} />

            <Route path="payments" element={<PaymentList />} />
            <Route path="payments/new" element={<PaymentForm />} />
            <Route path="payments/edit/:id" element={<PaymentForm />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
