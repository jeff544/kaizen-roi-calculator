import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calculator, CheckCircle, Clock, Users, Sparkles } from 'lucide-react';

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    currentRevenue: '',
    annualSaaS: '',
    hoursPerStaff: '',
    numberOfStaff: '',
    annualSalary: '',
    revenueGrowth: '',
    currentSoftwareCost: '',
    departmentName: ''
  });

  const handleChange = (field, value) => {
    if (field === 'departmentName' || value === '' || !isNaN(value)) {
      setInputs(prev => ({ ...prev, [field]: value }));
    }
  };

  const getSuggestedSaaS = (revenue) => {
    let percentage = 0.05;
    if (revenue >= 5000000) percentage = 0.06;
    const revShareEquivalent = revenue * percentage;
    const saasFee = Math.round(revShareEquivalent * 0.7);
    return { 
      suggested: saasFee,
      percentage: percentage * 100,
      revShare: revShareEquivalent 
    };
  };

  // Calculations
  const currentRevenue = parseFloat(inputs.currentRevenue) || 0;
  const annualSaaS = parseFloat(inputs.annualSaaS) || 0;
  const hoursPerStaff = parseFloat(inputs.hoursPerStaff) || 0;
  const numberOfStaff = parseFloat(inputs.numberOfStaff) || 0;
  const annualSalary = parseFloat(inputs.annualSalary) || 0;
  const revenueGrowth = parseFloat(inputs.revenueGrowth) || 0;
  const currentSoftwareCost = parseFloat(inputs.currentSoftwareCost) || 0;

  const suggestedSaaS = getSuggestedSaaS(currentRevenue);
  const totalHours = hoursPerStaff * numberOfStaff * 52;
  const laborSavings = (hoursPerStaff * 52 / 2080) * numberOfStaff * annualSalary;
  const additionalRevenue = currentRevenue * (revenueGrowth / 100);
  const softwareSavings = currentSoftwareCost - annualSaaS;
  const totalAnnualValue = laborSavings + additionalRevenue + softwareSavings;
  const netValue = totalAnnualValue - annualSaaS;
  const roi = annualSaaS > 0 ? ((netValue / annualSaaS) * 100) : 0;
  const fiveYearValue = (totalAnnualValue * 5) - (annualSaaS * 5);
  const paybackMonths = annualSaaS > 0 && totalAnnualValue > 0 
    ? (annualSaaS / totalAnnualValue) * 12 
    : 0;

  const hasInputs = currentRevenue > 0 || annualSaaS > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Calculate Your ROI with Kaizen Labs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See exactly how much your department will save and earn with our all-in-one recreation platform
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          {/* Value Props Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Free Implementation</h3>
                  <p className="text-emerald-100 text-sm">Complete setup included</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Free Training</h3>
                  <p className="text-emerald-100 text-sm">Staff onboarding covered</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Unlimited Support</h3>
                  <p className="text-emerald-100 text-sm">Updates & fixes included</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Current State */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Your Current Situation</h2>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={inputs.departmentName}
                    onChange={(e) => handleChange('departmentName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder=""
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Annual Department Revenue
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={inputs.currentRevenue}
                      onChange={(e) => handleChange('currentRevenue', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg"
                      placeholder=""
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Software Costs (Annual)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={inputs.currentSoftwareCost}
                      onChange={(e) => handleChange('currentSoftwareCost', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg"
                      placeholder=""
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Include registration, scheduling, payments, etc.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hours Per Staff Per Week on Manual Tasks
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={inputs.hoursPerStaff}
                      onChange={(e) => handleChange('hoursPerStaff', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg"
                      placeholder=""
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Paper forms, phone calls, spreadsheets, etc.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Staff Members
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={inputs.numberOfStaff}
                      onChange={(e) => handleChange('numberOfStaff', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg"
                      placeholder=""
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Staff doing manual admin work</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Average Admin Annual Salary
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={inputs.annualSalary}
                      onChange={(e) => handleChange('annualSalary', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg"
                      placeholder=""
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Average salary for staff doing manual work</p>
                </div>
              </div>

              {/* With Kaizen Labs */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">With Kaizen Labs</h2>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Annual SaaS Fee
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={inputs.annualSaaS}
                      onChange={(e) => handleChange('annualSaaS', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg bg-emerald-50"
                      placeholder=""
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2 font-medium">
                    All-inclusive: No hidden fees or surprise costs
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Revenue Growth (%)
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={inputs.revenueGrowth}
                      onChange={(e) => handleChange('revenueGrowth', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg bg-emerald-50"
                      placeholder=""
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Typical clients see 8-15% growth from online registration & payments
                  </p>
                </div>

                {/* Quick Impact Stats */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-8">
                  <h3 className="font-semibold text-gray-800 mb-3">What You'll Gain:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 24/7 online registration & payments</li>
                    <li>✓ Automated waitlists & communications</li>
                    <li>✓ Mobile-friendly resident experience</li>
                    <li>✓ Real-time reporting & analytics</li>
                    <li>✓ Reduce no-shows with reminders</li>
                    <li>✓ Streamline facility scheduling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {hasInputs && (
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-6 h-6" />
                  <h3 className="text-sm font-medium opacity-90">Annual ROI</h3>
                </div>
                <p className="text-5xl font-bold mb-2">{roi.toFixed(0)}%</p>
                <p className="text-sm opacity-90">Return on investment</p>
              </div>

              <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-6 h-6" />
                  <h3 className="text-sm font-medium opacity-90">Year 1 Net Value</h3>
                </div>
                <p className="text-5xl font-bold mb-2">${(netValue/1000).toFixed(0)}K</p>
                <p className="text-sm opacity-90">After SaaS fee</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-6 h-6" />
                  <h3 className="text-sm font-medium opacity-90">Payback Period</h3>
                </div>
                <p className="text-5xl font-bold mb-2">{paybackMonths.toFixed(1)}</p>
                <p className="text-sm opacity-90">Months to break even</p>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="text-sm font-medium opacity-90">5-Year Value</h3>
                </div>
                <p className="text-5xl font-bold mb-2">${(fiveYearValue/1000).toFixed(0)}K</p>
                <p className="text-sm opacity-90">Total net value</p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-blue-900">
                  <strong>No hidden costs:</strong> Implementation, training, ongoing support, and all platform updates are included in your annual fee. What you see is what you pay.
                </p>
              </div>
            </div>
          </>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Department?
          </h2>
          <p className="text-xl mb-8 text-emerald-100 max-w-2xl mx-auto">
            Join parks & recreation departments across the country already saving time and growing revenue with Kaizen Labs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.kaizenlabs.co/book-a-demo/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg inline-block"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}