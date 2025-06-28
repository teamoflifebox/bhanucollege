import React, { useState } from 'react';
import { CreditCard, Download, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import DataTable from '../components/UI/DataTable';

const feeStructure = [
  { category: 'Tuition Fee', semester1: 25000, semester2: 25000, total: 50000, status: 'Paid' },
  { category: 'Lab Fee', semester1: 5000, semester2: 5000, total: 10000, status: 'Paid' },
  { category: 'Library Fee', semester1: 2000, semester2: 2000, total: 4000, status: 'Pending' },
  { category: 'Sports Fee', semester1: 3000, semester2: 3000, total: 6000, status: 'Pending' },
  { category: 'Development Fee', semester1: 5000, semester2: 5000, total: 10000, status: 'Overdue' },
];

const paymentHistory = [
  { date: '2024-01-15', description: 'Tuition Fee - Semester 1', amount: 25000, method: 'Online', status: 'Success' },
  { date: '2024-01-15', description: 'Lab Fee - Semester 1', amount: 5000, method: 'Online', status: 'Success' },
  { date: '2024-01-10', description: 'Application Fee', amount: 1000, method: 'Cash', status: 'Success' },
];

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const feeColumns = [
    { key: 'category', label: 'Fee Category' },
    { key: 'total', label: 'Annual Fee (₹)' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Action' },
  ];

  const historyColumns = [
    { key: 'date', label: 'Date' },
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Amount (₹)' },
    { key: 'method', label: 'Method' },
    { key: 'status', label: 'Status' },
  ];

  const processedFeeData = feeStructure.map(item => ({
    ...item,
    total: `₹${item.total.toLocaleString()}`,
    status: (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
        item.status === 'Paid' 
          ? 'bg-green-100 text-green-800' 
          : item.status === 'Pending'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-red-100 text-red-800'
      }`}>
        {item.status === 'Paid' && <CheckCircle className="w-3 h-3 mr-1" />}
        {item.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
        {item.status === 'Overdue' && <AlertTriangle className="w-3 h-3 mr-1" />}
        {item.status}
      </span>
    ),
    action: item.status !== 'Paid' ? (
      <button className="bg-primary-600 text-white px-3 py-1 rounded text-xs hover:bg-primary-700 transition-colors">
        Pay Now
      </button>
    ) : (
      <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs hover:bg-gray-200 transition-colors">
        Receipt
      </button>
    )
  }));

  const processedHistoryData = paymentHistory.map(item => ({
    ...item,
    amount: `₹${item.amount.toLocaleString()}`,
    status: (
      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        {item.status}
      </span>
    )
  }));

  const totalFees = feeStructure.reduce((sum, item) => sum + item.total, 0);
  const paidFees = feeStructure.filter(item => item.status === 'Paid').reduce((sum, item) => sum + item.total, 0);
  const pendingFees = totalFees - paidFees;
  const overdueFees = feeStructure.filter(item => item.status === 'Overdue').reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Fee Management</h1>
        <p className="text-primary-100 mt-1">
          Manage your payments and download receipts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Fees"
          value={`₹${totalFees.toLocaleString()}`}
          icon={CreditCard}
          change="Annual amount"
          changeType="neutral"
        />
        <StatCard
          title="Paid Amount"
          value={`₹${paidFees.toLocaleString()}`}
          icon={CheckCircle}
          change="Successfully paid"
          changeType="positive"
        />
        <StatCard
          title="Pending Amount"
          value={`₹${pendingFees.toLocaleString()}`}
          icon={Clock}
          change="Due soon"
          changeType="neutral"
        />
        <StatCard
          title="Overdue Amount"
          value={`₹${overdueFees.toLocaleString()}`}
          icon={AlertTriangle}
          change="Immediate attention"
          changeType="negative"
        />
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Fee Overview' },
              { key: 'payment', label: 'Make Payment' },
              { key: 'history', label: 'Payment History' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <DataTable columns={feeColumns} data={processedFeeData} />
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Payment Reminder</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      You have ₹{pendingFees.toLocaleString()} in pending fees. Please make payment before the due date to avoid late fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center">
                <CreditCard className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Make Payment</h3>
                <p className="text-gray-600">Pay your fees securely online</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Payment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Library Fee</span>
                    <span>₹4,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sports Fee</span>
                    <span>₹6,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Development Fee (Overdue)</span>
                    <span>₹10,000</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total Amount</span>
                    <span>₹20,000</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Credit/Debit Card</option>
                    <option>Net Banking</option>
                    <option>UPI</option>
                    <option>Digital Wallet</option>
                  </select>
                </div>

                <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors font-medium">
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Statement</span>
                </button>
              </div>
              
              <DataTable columns={historyColumns} data={processedHistoryData} />
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Download className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Download Fee Structure</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Payment Schedule</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <CreditCard className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Auto-Pay Setup</span>
        </button>
      </div>
    </div>
  );
}