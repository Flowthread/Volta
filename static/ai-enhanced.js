/**
 * AI Enhanced Features for Volta
 * World-class AI integration with advanced capabilities
 */

class AIEnhancedSystem {
    constructor() {
        this.aiStatus = null;
        this.conversationHistory = [];
        this.currentUserId = 'user_' + Math.random().toString(36).substr(2, 9);
        this.aiCapabilities = [];
        this.visualAnalysisEnabled = false;

        this.initializeAI();
    }

    async initializeAI() {
        try {
            console.log('🚀 Initializing World-Class AI System...');

            // Get AI status and capabilities
            const response = await fetch('/api/ai/enhanced/status');
            this.aiStatus = await response.json();

            this.aiCapabilities = this.aiStatus.advanced_features || [];
            this.visualAnalysisEnabled = this.aiStatus.capabilities?.visual_processing || false;

            console.log('✅ AI System Initialized with capabilities:', this.aiCapabilities);

            // Initialize AI interface
            this.initializeAIInterface();

            // Start periodic AI updates
            this.startAIMonitoring();

        } catch (error) {
            console.error('❌ AI initialization failed:', error);
        }
    }

    initializeAIInterface() {
        // Add AI capabilities indicator to the chatbot
        const chatHeader = document.querySelector('.chat-title');
        if (chatHeader && this.aiCapabilities.length > 0) {
            chatHeader.innerHTML = `
                <span class="chat-avatar" style="background: linear-gradient(45deg, #00ff88, #00aaff);"></span>
                Volta AI Assistant
            `;
        }

        // Add AI status indicator
        this.addAIStatusIndicator();

        // Enhance chat input with AI features
        this.enhanceChatInput();
    }

    addAIStatusIndicator() {
        const statusBar = document.querySelector('.status-bar');
        if (statusBar) {
            const aiIndicator = document.createElement('div');
            aiIndicator.className = 'status-item';
            aiIndicator.innerHTML = `
                <span style="color: #00ff88;">🧠</span>
                <span id="ai-status">AI: Active</span>
            `;
            statusBar.appendChild(aiIndicator);
        }
    }

    enhanceChatInput() {
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.querySelector('.chat-send');

        if (chatInput && chatSend) {
            // Add AI feature buttons
            const aiFeatureButtons = document.createElement('div');
            aiFeatureButtons.className = 'ai-feature-buttons';
            aiFeatureButtons.style.cssText = `
                display: flex;
                gap: 8px;
                margin-top: 8px;
                flex-wrap: wrap;
            `;

            const features = [
                { id: 'visual-analysis', icon: '👁️', title: 'Visual Analysis', enabled: this.visualAnalysisEnabled }
            ];

            features.forEach(feature => {
                if (feature.enabled) {
                    const button = document.createElement('button');
                    button.className = 'ai-feature-btn';
                    button.innerHTML = `${feature.icon} ${feature.title}`;
                    button.title = `Get ${feature.title}`;
                    button.style.cssText = `
                        background: rgba(0, 255, 136, 0.1);
                        border: 1px solid rgba(0, 255, 136, 0.3);
                        color: #00ff88;
                        padding: 4px 8px;
                        border-radius: 12px;
                        font-size: 11px;
                        cursor: pointer;
                        transition: all 0.2s;
                    `;

                    button.addEventListener('mouseenter', () => {
                        button.style.background = 'rgba(0, 255, 136, 0.2)';
                        button.style.borderColor = 'rgba(0, 255, 136, 0.5)';
                    });

                    button.addEventListener('mouseleave', () => {
                        button.style.background = 'rgba(0, 255, 136, 0.1)';
                        button.style.borderColor = 'rgba(0, 255, 136, 0.3)';
                    });

                    button.addEventListener('click', () => this.handleAIFeatureRequest(feature.id));
                    aiFeatureButtons.appendChild(button);
                }
            });

            chatInput.parentNode.appendChild(aiFeatureButtons);
        }
    }

    async handleAIFeatureRequest(featureId) {
        try {
            let response;
            let message = '';

            switch (featureId) {
                case 'visual-analysis':
                    response = await fetch('/api/ai/enhanced/visual', { method: 'POST' });
                    message = '🔍 Performing visual analysis of current system state...';
                    break;

                case 'research-insights':
                    response = await fetch('/api/ai/enhanced/research');
                    message = '🔬 Generating research-level insights...';
                    break;

                case 'pattern-analysis':
                    response = await fetch('/api/ai/enhanced/patterns');
                    message = '📊 Analyzing system patterns...';
                    break;

                case 'predictions':
                    response = await fetch('/api/ai/enhanced/predictions');
                    message = '🔮 Generating predictive analysis...';
                    break;

                case 'comprehensive-report':
                    response = await fetch('/api/ai/enhanced/comprehensive-report');
                    message = '📋 Creating comprehensive AI-enhanced report...';
                    break;
            }

            if (response) {
                const data = await response.json();
                this.displayAIResponse(message, data, featureId);
            }

        } catch (error) {
            console.error(`AI feature ${featureId} failed:`, error);
            this.displayAIResponse(`❌ ${featureId} failed: ${error.message}`, null, 'error');
        }
    }

    displayAIResponse(message, data, type) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        // Add user request message
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.innerHTML = `<div class="message-content">${message}</div>`;
        chatMessages.appendChild(userMessage);

        // Add AI response
        const aiMessage = document.createElement('div');
        aiMessage.className = 'chat-message assistant';

        let responseContent = '';

        if (data && !data.error) {
            switch (type) {
                case 'visual-analysis':
                    responseContent = this.formatVisualAnalysisResponse(data);
                    break;
                case 'research-insights':
                    responseContent = this.formatResearchInsightsResponse(data);
                    break;
                case 'pattern-analysis':
                    responseContent = this.formatPatternAnalysisResponse(data);
                    break;
                case 'predictions':
                    responseContent = this.formatPredictionsResponse(data);
                    break;
                case 'comprehensive-report':
                    responseContent = data.text || this.formatComprehensiveReportResponse(data);
                    break;
                default:
                    responseContent = JSON.stringify(data, null, 2);
            }
        } else {
            responseContent = data?.error || 'No data available';
        }

        aiMessage.innerHTML = `
            <div class="message-content">
                <div style="color: #00ff88; font-weight: 600; margin-bottom: 8px;">
                    🤖 AI Enhanced Response
                </div>
                <div style="white-space: pre-line;">${responseContent}</div>
            </div>
        `;

        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    formatVisualAnalysisResponse(data) {
        const analysis = data.visual_analysis;
        if (!analysis) return 'No visual analysis data available';

        let response = '🔍 **VISUAL ANALYSIS RESULTS**\n\n';

        if (analysis.grid_health_visual) {
            const health = analysis.grid_health_visual;
            response += `⚡ **Grid Health**: ${health.health_score?.toFixed(1)}%\n`;
            response += `📊 Operational: ${health.operational_substations}/${health.total_substations} substations\n\n`;
        }

        if (analysis.traffic_flow_patterns) {
            const traffic = analysis.traffic_flow_patterns;
            response += `🚦 **Traffic Analysis**\n`;
            response += `• Vehicles: ${traffic.vehicle_count || 0}\n`;
            response += `• Avg Speed: ${traffic.average_speed?.toFixed(1) || 0} m/s\n`;
            response += `• Congestion: ${traffic.congestion_level || 'unknown'}\n\n`;
        }

        if (analysis.charging_station_utilization) {
            const charging = analysis.charging_station_utilization;
            response += `🔋 **Charging Stations**\n`;
            response += `• Utilization: ${charging.utilization_rate?.toFixed(1) || 0}%\n`;
            response += `• Available Capacity: ${charging.available_capacity || 0} ports\n\n`;
        }

        if (analysis.optimization_opportunities?.length > 0) {
            response += '💡 **Optimization Opportunities**\n';
            analysis.optimization_opportunities.forEach(opp => {
                response += `• ${opp}\n`;
            });
        }

        return response;
    }

    formatResearchInsightsResponse(data) {
        if (data.error) return `❌ ${data.error}`;

        let response = `📋 ${data.research_summary}\n\n`;


        if (data.predictive_intelligence) {
            const pred = data.predictive_intelligence;
            response += `🔮 **Predictive Intelligence**\n`;
            response += `• Forecast Horizon: ${pred.forecast_horizon}\n`;
            response += `• Grid Stability: ${(pred.grid_stability_trend * 100)?.toFixed(1) || 0}%\n`;
            response += `• Optimization Windows: ${pred.optimization_windows}\n\n`;
        }

        if (data.ai_performance) {
            const perf = data.ai_performance;
            response += `⚡ **AI Performance**\n`;
            response += `• Response Time: ${perf.response_time?.toFixed(2) || 0}s\n`;
            response += `• Accuracy: ${(perf.accuracy * 100)?.toFixed(1) || 0}%\n`;
            response += `• Learning Progress: ${perf.learning_progress || 'stable'}\n\n`;
        }

        response += '🚀 **Advanced Capabilities Active**\n';
        data.advanced_capabilities?.forEach(cap => {
            response += `${cap}\n`;
        });

        return response;
    }

    formatPatternAnalysisResponse(data) {
        const patterns = data.pattern_analysis;
        if (!patterns) return 'No pattern analysis data available';

        let response = '';

        if (patterns.detected_patterns?.length > 0) {
            response += '🔍 **Active Patterns**\n';
            patterns.detected_patterns.forEach(pattern => {
                response += `• ${pattern.name || pattern.type}: ${(pattern.confidence * 100)?.toFixed(1)}% confidence\n`;
            });
            response += '\n';
        }

        if (patterns.trend_analysis) {
            response += '📈 **Trend Analysis**\n';
            const trends = patterns.trend_analysis;
            Object.entries(trends).forEach(([key, trend]) => {
                if (trend.direction) {
                    response += `• ${key.replace('_', ' ')}: ${trend.direction} (${(trend.confidence * 100)?.toFixed(1)}% confidence)\n`;
                }
            });
            response += '\n';
        }

        if (patterns.predictive_insights?.length > 0) {
            response += '🔮 **Predictive Insights**\n';
            patterns.predictive_insights.forEach(insight => {
                response += `• ${insight}\n`;
            });
            response += '\n';
        }

        if (patterns.optimization_recommendations?.length > 0) {
            response += '💡 **Optimization Recommendations**\n';
            patterns.optimization_recommendations.forEach(rec => {
                response += `• ${rec}\n`;
            });
        }

        response += `\n📊 Overall Anomaly Score: ${patterns.anomaly_score?.toFixed(3) || 0}`;

        return response;
    }

    formatPredictionsResponse(data) {
        const predictions = data.predictions;
        if (!predictions) return 'No prediction data available';

        let response = '🔮 **ENHANCED AI PREDICTIONS**\n\n';

        Object.entries(predictions).forEach(([timeframe, pred]) => {
            const minutes = timeframe.replace('_min', '');
            response += `⏱️ **${minutes} Minutes Ahead**\n`;

            if (pred.power_demand?.predictions?.length > 0) {
                const powerPred = pred.power_demand.predictions[0];
                response += `• Power Demand: ${powerPred.predicted_mw?.toFixed(1) || 0} MW\n`;
            }

            if (pred.grid_stability?.average_stability) {
                response += `• Grid Stability: ${(pred.grid_stability.average_stability * 100)?.toFixed(1)}%\n`;
            }

            if (pred.v2g_opportunities?.length > 0) {
                const v2gOpp = pred.v2g_opportunities[0];
                response += `• V2G Opportunity: ${v2gOpp.opportunity_level || 'unknown'} level\n`;
            }

            if (pred.optimization_windows?.length > 0) {
                response += `• Optimization Windows: ${pred.optimization_windows.length} available\n`;
            }

            response += '\n';
        });

        return response;
    }

    formatComprehensiveReportResponse(data) {
        if (data.data?.text) return data.data.text;

        let response = '📋 **COMPREHENSIVE AI-ENHANCED REPORT**\n\n';

        if (data.data?.executive_summary) {
            response += `📊 **Executive Summary**\n${data.data.executive_summary}\n\n`;
        }

        return response + 'Complete report data available in console.';
    }

    async sendEnhancedMessage(message, context = {}) {
        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message,
                    user_id: this.currentUserId,
                    context: context
                })
            });

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Enhanced message failed:', error);
            throw error;
        }
    }

    startAIMonitoring() {
        // AI monitoring disabled to prevent automatic insights - only update when manually requested
        // setInterval(async () => {
        //     try {
        //         const response = await fetch('/api/ai/enhanced/performance');
        //         const performance = await response.json();
        //         this.updateAIStatusDisplay(performance);
        //     } catch (error) {
        //         console.error('AI monitoring update failed:', error);
        //     }
        // }, 30000); // Every 30 seconds
        console.log('AI monitoring disabled - manual updates only');
    }

    updateAIStatusDisplay(performance) {
        const aiStatusElement = document.getElementById('ai-status');
        if (aiStatusElement && performance.system_health) {
            const health = performance.system_health;
            const color = health === 'optimal' ? '#00ff88' : health === 'good' ? '#ffaa00' : '#ff6b6b';
            aiStatusElement.innerHTML = `AI: ${health}`;
            aiStatusElement.style.color = color;
        }
    }

    // Visual processing utilities
    async analyzeMapScreenshot() {
        if (!this.visualAnalysisEnabled) {
            console.log('Visual analysis not enabled');
            return;
        }

        try {
            // This would capture the map canvas and send for analysis
            const canvas = document.querySelector('#map canvas');
            if (canvas) {
                canvas.toBlob(async (blob) => {
                    const formData = new FormData();
                    formData.append('image', blob);
                    formData.append('text', 'Analyze this map view');

                    const response = await fetch('/api/ai/enhanced/multimodal', {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();
                    console.log('Visual analysis result:', result);
                });
            }
        } catch (error) {
            console.error('Map screenshot analysis failed:', error);
        }
    }

    // Conversation intelligence
    async getConversationIntelligence() {
        try {
            const response = await fetch(`/api/ai/enhanced/conversation/${this.currentUserId}`);
            const intelligence = await response.json();
            console.log('Conversation Intelligence:', intelligence);
            return intelligence;
        } catch (error) {
            console.error('Conversation intelligence failed:', error);
        }
    }
}

// Initialize AI Enhanced System
const aiEnhanced = new AIEnhancedSystem();

// Export for use in other scripts
window.aiEnhanced = aiEnhanced;

// Leave the original sendChatMessage function intact - just make sure it works
console.log('AI Enhanced System loaded - keeping original chat function');

console.log('🚀 AI Enhanced System loaded successfully');