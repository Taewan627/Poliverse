import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Home, Users, Building2, DollarSign, AlertCircle, Zap, Play, RefreshCw } from 'lucide-react';

const PoliVerse = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [params, setParams] = useState({
    taxIncrease: 10,
    householdIncome: 5,
    marketElasticity: 5,
    bankLoanRate: 3.5,
    rentToPriceRatio: 4,
    govCompensation: 50,
    mediaBias: 5,
    polarization: 4,
    aiConfidence: 85,
    policyDuration: 3,
    inflationRate: 2.5,
    unemployment: 3.5,
    gdpGrowth: 2.8,
    publicDebt: 45,
    wealthInequality: 6,
    educationBudget: 40,
    healthcareBudget: 35,
    environmentScore: 5
  });

  const scenarios = {
    mild: { taxIncrease: 5, householdIncome: 6, marketElasticity: 5, bankLoanRate: 3.0, rentToPriceRatio: 4, govCompensation: 60, mediaBias: 4, polarization: 3, aiConfidence: 85, policyDuration: 2, inflationRate: 2.0, unemployment: 3.2, gdpGrowth: 3.2, publicDebt: 42, wealthInequality: 5, educationBudget: 45, healthcareBudget: 40, environmentScore: 6 },
    strong: { taxIncrease: 20, householdIncome: 4, marketElasticity: 7, bankLoanRate: 4.5, rentToPriceRatio: 5, govCompensation: 30, mediaBias: 7, polarization: 8, aiConfidence: 75, policyDuration: 5, inflationRate: 3.5, unemployment: 4.5, gdpGrowth: 1.8, publicDebt: 52, wealthInequality: 8, educationBudget: 35, healthcareBudget: 30, environmentScore: 4 },
    weakened: { taxIncrease: -10, householdIncome: 6, marketElasticity: 4, bankLoanRate: 2.5, rentToPriceRatio: 3, govCompensation: 80, mediaBias: 3, polarization: 2, aiConfidence: 90, policyDuration: 1, inflationRate: 1.8, unemployment: 2.8, gdpGrowth: 3.8, publicDebt: 38, wealthInequality: 4, educationBudget: 50, healthcareBudget: 45, environmentScore: 7 }
  };

  const calculatePredictions = () => {
    const taxImpact = params.taxIncrease / 10;
    const elasticity = params.marketElasticity / 10;
    const income = params.householdIncome / 10;
    
    return {
      housingPriceChange: -taxImpact * elasticity * 8 + income * 2,
      transactionVolume: -taxImpact * 15 + income * 5 - elasticity * 3,
      satisfactionIndex: -taxImpact * 6 + (params.govCompensation / 10) + income * 3,
      economicGrowth: -taxImpact * 2 + income * 4 + (params.govCompensation / 20),
      publicRevenue: taxImpact * 10 + (params.govCompensation / 5)
    };
  };

  const predictions = calculatePredictions();

  const sentimentData = [
    { name: '긍정', value: Math.max(0, 40 - params.taxIncrease * 2 + params.govCompensation / 2), color: '#10b981' },
    { name: '중립', value: 30 + params.mediaBias, color: '#6b7280' },
    { name: '부정', value: Math.max(0, 30 + params.taxIncrease * 2 - params.govCompensation / 3), color: '#ef4444' }
  ];

  const timelineData = [
    { month: '1개월', housing: 100, satisfaction: 70, revenue: 100 },
    { month: '3개월', housing: 100 + predictions.housingPriceChange * 0.3, satisfaction: 70 + predictions.satisfactionIndex * 0.3, revenue: 100 + predictions.publicRevenue * 0.3 },
    { month: '6개월', housing: 100 + predictions.housingPriceChange * 0.6, satisfaction: 70 + predictions.satisfactionIndex * 0.6, revenue: 100 + predictions.publicRevenue * 0.6 },
    { month: '1년', housing: 100 + predictions.housingPriceChange, satisfaction: 70 + predictions.satisfactionIndex, revenue: 100 + predictions.publicRevenue },
    { month: '2년', housing: 100 + predictions.housingPriceChange * 1.2, satisfaction: 70 + predictions.satisfactionIndex * 0.9, revenue: 100 + predictions.publicRevenue * 1.3 },
    { month: '3년', housing: 100 + predictions.housingPriceChange * 1.1, satisfaction: 70 + predictions.satisfactionIndex * 0.8, revenue: 100 + predictions.publicRevenue * 1.5 }
  ];

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationProgress(0);
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const loadScenario = (scenarioName) => {
    setParams(scenarios[scenarioName]);
    runSimulation();
  };

  const ParamSlider = ({ label, value, onChange, min, max, step, unit = '' }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <label className="text-sm font-medium text-white">{label}</label>
        <span className="text-sm font-bold text-cyan-400">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
              폴리버스
            </h1>
            <p className="text-gray-300">AI 기반 정책 시뮬레이션 플랫폼</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <Play size={18} />
              {isSimulating ? '시뮬레이션 중...' : '시뮬레이션 실행'}
            </button>
            <button
              onClick={() => setParams(scenarios.mild)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              <RefreshCw size={18} />
              초기화
            </button>
          </div>
        </div>

        <div className="mb-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="정책을 검색하세요... (예: 탄소세, 기본소득, 의료보험 개혁)"
              className="w-full px-4 py-3 pr-12 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
          </div>
          {searchQuery && (
            <div className="mt-3 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                "{searchQuery}" 정책 분석 준비 중... (MVP 기능)
              </p>
            </div>
          )}
        </div>

        {isSimulating && (
          <div className="mb-6">
            <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-300"
                style={{ width: `${simulationProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-300 mt-2 text-center">
              온톨로지 관계 분석 중... {simulationProgress}%
            </p>
          </div>
        )}

        <div className="flex gap-2 mb-6 bg-black bg-opacity-30 p-1 rounded-lg overflow-x-auto">
          {[
            { id: 'dashboard', name: '대시보드' },
            { id: 'predictions', name: '예측 분석' },
            { id: 'sentiment', name: '여론 분석' },
            { id: 'scenarios', name: '시나리오' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-purple-900'
                  : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 max-h-screen overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="text-yellow-400" />
                정책 매개변수
              </h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-bold text-cyan-400 mb-3">경제 지표</h3>
                <ParamSlider label="세금 인상률" value={params.taxIncrease} onChange={(v) => setParams({...params, taxIncrease: v})} min={-20} max={30} step={1} unit="%" />
                <ParamSlider label="가구 소득 수준" value={params.householdIncome} onChange={(v) => setParams({...params, householdIncome: v})} min={1} max={10} step={1} />
                <ParamSlider label="인플레이션율" value={params.inflationRate} onChange={(v) => setParams({...params, inflationRate: v})} min={0} max={10} step={0.1} unit="%" />
                <ParamSlider label="실업률" value={params.unemployment} onChange={(v) => setParams({...params, unemployment: v})} min={1} max={15} step={0.1} unit="%" />
                <ParamSlider label="GDP 성장률" value={params.gdpGrowth} onChange={(v) => setParams({...params, gdpGrowth: v})} min={-5} max={10} step={0.1} unit="%" />
              </div>

              <div className="mb-6 border-t border-gray-600 pt-6">
                <h3 className="text-sm font-bold text-pink-400 mb-3">시장 요인</h3>
                <ParamSlider label="시장 탄력성" value={params.marketElasticity} onChange={(v) => setParams({...params, marketElasticity: v})} min={1} max={10} step={0.5} />
                <ParamSlider label="은행 대출 이율" value={params.bankLoanRate} onChange={(v) => setParams({...params, bankLoanRate: v})} min={1} max={8} step={0.1} unit="%" />
              </div>

              <div className="mb-6 border-t border-gray-600 pt-6">
                <h3 className="text-sm font-bold text-green-400 mb-3">정부 정책</h3>
                <ParamSlider label="정부 보상 예산" value={params.govCompensation} onChange={(v) => setParams({...params, govCompensation: v})} min={0} max={100} step={5} unit="%" />
                <ParamSlider label="교육 예산 비중" value={params.educationBudget} onChange={(v) => setParams({...params, educationBudget: v})} min={10} max={60} step={5} unit="%" />
                <ParamSlider label="정책 지속 기간" value={params.policyDuration} onChange={(v) => setParams({...params, policyDuration: v})} min={1} max={10} step={1} unit="년" />
              </div>

              <div className="border-t border-gray-600 pt-6">
                <h3 className="text-sm font-bold text-purple-400 mb-3">사회 지표</h3>
                <ParamSlider label="언론 편향성" value={params.mediaBias} onChange={(v) => setParams({...params, mediaBias: v})} min={1} max={10} step={1} />
                <ParamSlider label="사회 양극화" value={params.polarization} onChange={(v) => setParams({...params, polarization: v})} min={1} max={10} step={1} />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Home className="text-blue-400" size={24} />
                    <h3 className="font-semibold">주택 가격 변화</h3>
                  </div>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {predictions.housingPriceChange > 0 ? <TrendingUp className="text-green-400" /> : <TrendingDown className="text-red-400" />}
                    {predictions.housingPriceChange.toFixed(1)}%
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="text-purple-400" size={24} />
                    <h3 className="font-semibold">거래량</h3>
                  </div>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {predictions.transactionVolume > 0 ? <TrendingUp className="text-green-400" /> : <TrendingDown className="text-red-400" />}
                    {predictions.transactionVolume.toFixed(1)}%
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="text-green-400" size={24} />
                    <h3 className="font-semibold">만족도 지수</h3>
                  </div>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {predictions.satisfactionIndex > 0 ? <TrendingUp className="text-green-400" /> : <TrendingDown className="text-red-400" />}
                    {(70 + predictions.satisfactionIndex).toFixed(0)}/100
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="text-yellow-400" size={24} />
                    <h3 className="font-semibold">공공 수입</h3>
                  </div>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {predictions.publicRevenue > 0 ? <TrendingUp className="text-green-400" /> : <TrendingDown className="text-red-400" />}
                    {predictions.publicRevenue.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">시간대별 전망</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="month" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="housing" stroke="#3b82f6" strokeWidth={2} name="주택 가격 지수" />
                    <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={2} name="국민 만족도" />
                    <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} name="정부 수입" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">경제 영향 분석</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: '주택가격', value: predictions.housingPriceChange },
                  { name: '거래량', value: predictions.transactionVolume },
                  { name: '만족도', value: predictions.satisfactionIndex },
                  { name: '경제성장', value: predictions.economicGrowth },
                  { name: '세수', value: predictions.publicRevenue }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">AI 신뢰도 분석</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>전체 신뢰도</span>
                    <span className="font-bold">{params.aiConfidence}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-3">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: `${params.aiConfidence}%` }} />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-yellow-400 flex-shrink-0" size={20} />
                  <div className="text-sm">
                    <p className="font-bold mb-1">예측 한계</p>
                    <p className="text-gray-300">모델은 과거 데이터를 기반으로 합니다. 예측하지 못한 사건, 정책 변경, 시장 변동으로 실제 결과가 달라질 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sentiment' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">여론 분포</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">핵심 키워드</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { word: '주거 위기', size: params.taxIncrease > 15 ? 'text-2xl' : 'text-lg', color: 'text-red-400' },
                  { word: '재산세', size: 'text-3xl', color: 'text-blue-400' },
                  { word: '주거비 부담', size: params.householdIncome < 5 ? 'text-2xl' : 'text-base', color: 'text-yellow-400' },
                  { word: '정부 정책', size: 'text-xl', color: 'text-purple-400' },
                  { word: '시장 변동성', size: params.marketElasticity > 7 ? 'text-2xl' : 'text-base', color: 'text-orange-400' },
                  { word: '보상', size: params.govCompensation > 60 ? 'text-xl' : 'text-sm', color: 'text-green-400' }
                ].map((item, i) => (
                  <span key={i} className={`${item.size} ${item.color} font-bold`}>
                    {item.word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className="space-y-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">사전 구성 시나리오</h2>
              <p className="text-gray-300 mb-6">다양한 정책 접근 방식을 불러와서 비교하세요</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform"
                     onClick={() => loadScenario('mild')}>
                  <h3 className="text-xl font-bold mb-3">🌱 온건한 인상 (+5%)</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>전략:</strong> 균형 잡힌 접근</p>
                    <p><strong>보상:</strong> 60% 예산</p>
                    <p><strong>예상 영향:</strong></p>
                    <ul className="list-disc list-inside text-gray-200">
                      <li>적당한 세수 증가</li>
                      <li>최소한의 시장 혼란</li>
                      <li>긍정-중립 여론</li>
                    </ul>
                  </div>
                  <button className="mt-4 w-full bg-white text-green-900 py-2 rounded-lg font-bold hover:bg-gray-100">
                    시나리오 불러오기
                  </button>
                </div>

                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform"
                     onClick={() => loadScenario('strong')}>
                  <h3 className="text-xl font-bold mb-3">⚡ 강력한 인상 (+20%)</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>전략:</strong> 공격적 세수 확보</p>
                    <p><strong>보상:</strong> 30% 예산</p>
                    <p><strong>예상 영향:</strong></p>
                    <ul className="list-disc list-inside text-gray-200">
                      <li>높은 세수 증대</li>
                      <li>가격 충격 가능성</li>
                      <li>강한 부정적 여론</li>
                    </ul>
                  </div>
                  <button className="mt-4 w-full bg-white text-red-900 py-2 rounded-lg font-bold hover:bg-gray-100">
                    시나리오 불러오기
                  </button>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform"
                     onClick={() => loadScenario('weakened')}>
                  <h3 className="text-xl font-bold mb-3">🕊️ 세금 감면 (-10%)</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>전략:</strong> 경기 부양 접근</p>
                    <p><strong>보상:</strong> 80% 예산</p>
                    <p><strong>예상 영향:</strong></p>
                    <ul className="list-disc list-inside text-gray-200">
                      <li>세수 감소 위험</li>
                      <li>시장 활성화</li>
                      <li>긍정적 대중 반응</li>
                    </ul>
                  </div>
                  <button className="mt-4 w-full bg-white text-blue-900 py-2 rounded-lg font-bold hover:bg-gray-100">
                    시나리오 불러오기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto mt-8 text-center text-gray-400 text-sm">
        <p>폴리버스 MVP v1.0 | AI 기반 정책 시뮬레이션 플랫폼</p>
        <p className="mt-1">신뢰도: {params.aiConfidence}% | 온톨로지 기반 예측 모델링</p>
      </div>
    </div>
  );
};

export default PoliVerse;