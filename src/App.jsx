import React, { useState } from 'react';
import { Plus, Trash2, ArrowUpDown, TrendingUp } from 'lucide-react';

const VideoContentRanker = () => {
  const [videos, setVideos] = useState([
	{
	  id: 1,
	  title: 'Sample Video 1',
	  strategicAlignment: 7,
	  engagementPotential: 8,
	  trendingTopicScore: 6,
	  debateControversy: 7,
	  resourceEfficiency: 9,
	  viralPotential: 7,
	  brandFit: 8,
	  competitiveGap: 5
	}
  ]);

  const [weights, setWeights] = useState({
	strategicAlignment: 15,
	engagementPotential: 20,
	trendingTopicScore: 20,
	debateControversy: 15,
	resourceEfficiency: 10,
	viralPotential: 10,
	brandFit: 8,
	competitiveGap: 2
  });

  const factors = [
	{ key: 'strategicAlignment', label: 'Strategic Alignment', desc: 'Supports business goals and KPIs', icon: '🎯' },
	{ key: 'engagementPotential', label: 'Engagement Potential', desc: 'Drives comments, shares, saves, interactions', icon: '💬' },
	{ key: 'trendingTopicScore', label: 'Hot/Trending Topic', desc: 'Riding current trends, viral topics, cultural moments', icon: '🔥' },
	{ key: 'debateControversy', label: 'Debate/Discussion Value', desc: 'Sparks conversation, polarizing opinions, hot takes', icon: '⚡' },
	{ key: 'resourceEfficiency', label: 'Resource Efficiency', desc: 'Easy to produce, quick turnaround, low cost', icon: '⚙️' },
	{ key: 'viralPotential', label: 'Viral/Share Potential', desc: 'Likelihood of being shared beyond followers', icon: '🚀' },
	{ key: 'brandFit', label: 'Brand Safety & Fit', desc: 'On-brand, safe, aligns with values', icon: '🛡️' },
	{ key: 'competitiveGap', label: 'Competitive Advantage', desc: 'Unique angle competitors haven\'t covered', icon: '💎' }
  ];

  const calculateScore = (video) => {
	let total = 0;
	factors.forEach(factor => {
	  total += (video[factor.key] * weights[factor.key]) / 10;
	});
	return total.toFixed(1);
  };

  const addVideo = () => {
	const newVideo = {
	  id: Date.now(),
	  title: `Video Idea ${videos.length + 1}`,
	  strategicAlignment: 5,
	  engagementPotential: 5,
	  trendingTopicScore: 5,
	  debateControversy: 5,
	  resourceEfficiency: 5,
	  viralPotential: 5,
	  brandFit: 5,
	  competitiveGap: 5
	};
	setVideos([...videos, newVideo]);
  };

  const deleteVideo = (id) => {
	setVideos(videos.filter(v => v.id !== id));
  };

  const updateVideo = (id, field, value) => {
	setVideos(videos.map(v => 
	  v.id === id ? { ...v, [field]: value } : v
	));
  };

  const updateWeight = (key, value) => {
	setWeights({ ...weights, [key]: Number(value) });
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  const sortedVideos = [...videos].sort((a, b) => 
	calculateScore(b) - calculateScore(a)
  );

  const getUrgencyBadge = (video) => {
	const trend = video.trendingTopicScore;
	if (trend >= 8) return { label: 'URGENT - Act Now!', color: 'bg-red-500 text-white animate-pulse' };
	if (trend >= 6) return { label: 'Timely', color: 'bg-orange-500 text-white' };
	return { label: 'Evergreen', color: 'bg-green-500 text-white' };
  };

  return (
	<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
	  <div className="max-w-7xl mx-auto">
		<div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
		  <div className="flex items-center gap-3 mb-2">
			<TrendingUp size={36} className="text-blue-600" />
			<h1 className="text-4xl font-bold text-gray-800">
			  Social Video Content Ranker
			</h1>
		  </div>
		  <p className="text-gray-600 mb-6">
			Prioritize video production based on trends, debate potential, and engagement
		  </p>

		  {/* Weight Configuration */}
		  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
			<h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
			  <ArrowUpDown size={20} />
			  Factor Weights (Total: {totalWeight}%)
			  {totalWeight === 100 && <span className="text-green-600 text-sm">✓ Balanced</span>}
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			  {factors.map(factor => (
				<div key={factor.key} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition">
				  <label className="block text-sm font-medium text-gray-700 mb-1">
					{factor.icon} {factor.label}
				  </label>
				  <p className="text-xs text-gray-500 mb-3 h-8">{factor.desc}</p>
				  <div className="flex items-center gap-2">
					<input
					  type="range"
					  min="0"
					  max="50"
					  value={weights[factor.key]}
					  onChange={(e) => updateWeight(factor.key, e.target.value)}
					  className="flex-1"
					/>
					<span className="text-sm font-semibold text-blue-600 w-12 text-right">
					  {weights[factor.key]}%
					</span>
				  </div>
				</div>
			  ))}
			</div>
			{totalWeight !== 100 && (
			  <p className="text-orange-600 text-sm mt-4 font-medium">
				⚠️ Weights should total 100% for accurate scoring
			  </p>
			)}
		  </div>

		  {/* Quick Presets */}
		  <div className="bg-yellow-50 rounded-xl p-4 mb-6 border-2 border-yellow-200">
			<h3 className="font-semibold text-gray-800 mb-3">⚡ Quick Strategy Presets:</h3>
			<div className="flex flex-wrap gap-2">
			  <button
				onClick={() => setWeights({
				  strategicAlignment: 10,
				  engagementPotential: 25,
				  trendingTopicScore: 25,
				  debateControversy: 20,
				  resourceEfficiency: 5,
				  viralPotential: 10,
				  brandFit: 3,
				  competitiveGap: 2
				})}
				className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
			  >
				🔥 Viral/Trending Focus
			  </button>
			  <button
				onClick={() => setWeights({
				  strategicAlignment: 25,
				  engagementPotential: 15,
				  trendingTopicScore: 10,
				  debateControversy: 5,
				  resourceEfficiency: 15,
				  viralPotential: 10,
				  brandFit: 15,
				  competitiveGap: 5
				})}
				className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
			  >
				🎯 Brand-First Strategy
			  </button>
			  <button
				onClick={() => setWeights({
				  strategicAlignment: 15,
				  engagementPotential: 20,
				  trendingTopicScore: 20,
				  debateControversy: 15,
				  resourceEfficiency: 10,
				  viralPotential: 10,
				  brandFit: 8,
				  competitiveGap: 2
				})}
				className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-sm font-medium"
			  >
				⚖️ Balanced Approach
			  </button>
			</div>
		  </div>

		  {/* Video List */}
		  <div className="mb-6">
			<div className="flex justify-between items-center mb-4">
			  <h2 className="text-xl font-semibold text-gray-800">
				Video Content Ideas ({videos.length})
			  </h2>
			  <button
				onClick={addVideo}
				className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
			  >
				<Plus size={20} />
				Add Video Idea
			  </button>
			</div>

			{/* Priority Rankings */}
			<div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
			  <h3 className="text-lg font-semibold text-gray-800 mb-4">
				📊 Production Priority Ranking
			  </h3>
			  <div className="space-y-3">
				{sortedVideos.map((video, index) => {
				  const urgency = getUrgencyBadge(video);
				  return (
					<div
					  key={video.id}
					  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition"
					>
					  <div className="flex items-center justify-between flex-wrap gap-3">
						<div className="flex items-center gap-4 flex-1">
						  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md ${
							index === 0 ? 'bg-yellow-400 text-yellow-900' :
							index === 1 ? 'bg-gray-300 text-gray-700' :
							index === 2 ? 'bg-orange-300 text-orange-900' :
							'bg-blue-100 text-blue-700'
						  }`}>
							#{index + 1}
						  </div>
						  <div className="flex-1">
							<h4 className="font-semibold text-gray-800 text-lg">{video.title}</h4>
							<div className="flex gap-3 mt-1 flex-wrap">
							  <span className="text-sm text-gray-600">
								🔥 Trend: {video.trendingTopicScore}/10
							  </span>
							  <span className="text-sm text-gray-600">
								⚡ Debate: {video.debateControversy}/10
							  </span>
							  <span className="text-sm text-gray-600">
								💬 Engagement: {video.engagementPotential}/10
							  </span>
							</div>
						  </div>
						</div>
						<div className="flex items-center gap-3">
						  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${urgency.color}`}>
							{urgency.label}
						  </span>
						  <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${
							calculateScore(video) >= 70 ? 'bg-green-500 text-white' :
							calculateScore(video) >= 50 ? 'bg-yellow-400 text-yellow-900' :
							'bg-red-400 text-white'
						  }`}>
							{calculateScore(video)} pts
						  </div>
						</div>
					  </div>
					</div>
				  );
				})}
			  </div>
			</div>

			{/* Detailed Scoring */}
			<div className="space-y-4">
			  {videos.map(video => (
				<div key={video.id} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition">
				  <div className="flex justify-between items-start mb-4">
					<input
					  type="text"
					  value={video.title}
					  onChange={(e) => updateVideo(video.id, 'title', e.target.value)}
					  className="text-lg font-semibold bg-transparent border-b-2 border-transparent hover:border-blue-300 focus:border-blue-500 focus:outline-none transition px-2 py-1 flex-1"
					  placeholder="Enter video idea title..."
					/>
					<div className="flex items-center gap-4 ml-4">
					  <div className="text-right">
						<p className="text-sm text-gray-600">Priority Score</p>
						<p className="text-3xl font-bold text-blue-600">{calculateScore(video)}</p>
					  </div>
					  <button
						onClick={() => deleteVideo(video.id)}
						className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
					  >
						<Trash2 size={20} />
					  </button>
					</div>
				  </div>

				  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{factors.map(factor => (
					  <div key={factor.key} className="bg-white rounded-lg p-3 shadow-sm">
						<label className="block text-sm font-medium text-gray-700 mb-2">
						  {factor.icon} {factor.label}
						  <span className="text-xs text-blue-600 ml-1">
							({weights[factor.key]}%)
						  </span>
						</label>
						<div className="flex items-center gap-3">
						  <input
							type="range"
							min="1"
							max="10"
							value={video[factor.key]}
							onChange={(e) => updateVideo(video.id, factor.key, Number(e.target.value))}
							className="flex-1"
						  />
						  <span className="text-lg font-bold text-gray-700 w-10 text-center bg-gray-100 rounded px-2 py-1">
							{video[factor.key]}
						  </span>
						</div>
					  </div>
					))}
				  </div>
				</div>
			  ))}
			</div>
		  </div>
		</div>

		{/* Scoring Guide */}
		<div className="bg-white rounded-2xl shadow-xl p-8">
		  <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Detailed Scoring Guide</h2>
		  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			{factors.map(factor => (
			  <div key={factor.key} className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-lg p-4">
				<h3 className="font-semibold text-gray-800 mb-2">
				  {factor.icon} {factor.label}
				</h3>
				<p className="text-sm text-gray-600 mb-3">{factor.desc}</p>
				{factor.key === 'trendingTopicScore' && (
				  <div className="text-xs text-gray-700 space-y-1">
					<p>• 9-10: Viral moment happening NOW</p>
					<p>• 7-8: Hot trend, high search volume</p>
					<p>• 4-6: Growing interest, moderate trend</p>
					<p>• 1-3: Evergreen, no time pressure</p>
				  </div>
				)}
				{factor.key === 'debateControversy' && (
				  <div className="text-xs text-gray-700 space-y-1">
					<p>• 9-10: Highly polarizing, sparks debate</p>
					<p>• 7-8: Strong opinions, hot take potential</p>
					<p>• 4-6: Some discussion value</p>
					<p>• 1-3: Safe, non-controversial</p>
				  </div>
				)}
				{factor.key === 'engagementPotential' && (
				  <div className="text-xs text-gray-700 space-y-1">
					<p>• 9-10: Will drive massive comments/shares</p>
					<p>• 7-8: High interaction expected</p>
					<p>• 4-6: Moderate engagement</p>
					<p>• 1-3: Low interaction likely</p>
				  </div>
				)}
			  </div>
			))}
		  </div>

		  <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
			<h3 className="font-semibold text-gray-800 mb-3">💡 Pro Tips for Maximum Engagement</h3>
			<ul className="text-sm text-gray-700 space-y-2">
			  <li>• <strong>Trending topics</strong> have short shelf life - produce and publish quickly!</li>
			  <li>• <strong>Debate-worthy content</strong> drives comments - ask questions, take stances</li>
			  <li>• <strong>Balance risk</strong>: Mix safe content with bold, controversial takes</li>
			  <li>• <strong>Monitor trends</strong> daily - use TikTok, Twitter, Google Trends</li>
			  <li>• <strong>Engagement beats perfection</strong> - speed to market matters for trends</li>
			  <li>• <strong>Comment-bait</strong> works - "Unpopular opinion:" or "Hot take:" formats</li>
			</ul>
		  </div>
		</div>
	  </div>
	</div>
  );
};

export default VideoContentRanker;