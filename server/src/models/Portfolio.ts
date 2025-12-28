import mongoose, { Document, Schema } from 'mongoose';

export interface IHolding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  sector: string;
  exchange: string;
  marketCap?: number;
  pe?: number;
  pb?: number;
  dividendYield?: number;
  beta?: number;
  riskScore?: number;
  fraudScore?: number;
  lastUpdated: Date;
}

export interface IPortfolio extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  holdings: IHolding[];
  totalValue: number;
  totalInvestment: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
  riskAnalysis: {
    overallRiskScore: number;
    concentrationRisk: number;
    sectorRisk: number;
    volatilityScore: number;
    betaScore: number;
    diversificationScore: number;
    fraudRiskScore: number;
    recommendations: string[];
    lastAnalyzed: Date;
  };
  alerts: {
    type: 'risk' | 'fraud' | 'concentration' | 'volatility';
    message: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    isActive: boolean;
    createdAt: Date;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HoldingSchema = new Schema<IHolding>({
  symbol: { type: String, required: true, uppercase: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  avgPrice: { type: Number, required: true, min: 0 },
  currentPrice: { type: Number, required: true, min: 0 },
  sector: { type: String, required: true },
  exchange: { type: String, required: true },
  marketCap: Number,
  pe: Number,
  pb: Number,
  dividendYield: Number,
  beta: Number,
  riskScore: { type: Number, min: 0, max: 100 },
  fraudScore: { type: Number, min: 0, max: 100 },
  lastUpdated: { type: Date, default: Date.now }
});

const PortfolioSchema = new Schema<IPortfolio>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Portfolio name is required'],
    trim: true,
    maxlength: [100, 'Portfolio name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  holdings: [HoldingSchema],
  totalValue: { type: Number, default: 0, min: 0 },
  totalInvestment: { type: Number, default: 0, min: 0 },
  totalGainLoss: { type: Number, default: 0 },
  totalGainLossPercentage: { type: Number, default: 0 },
  riskAnalysis: {
    overallRiskScore: { type: Number, default: 0, min: 0, max: 100 },
    concentrationRisk: { type: Number, default: 0, min: 0, max: 100 },
    sectorRisk: { type: Number, default: 0, min: 0, max: 100 },
    volatilityScore: { type: Number, default: 0, min: 0, max: 100 },
    betaScore: { type: Number, default: 1 },
    diversificationScore: { type: Number, default: 0, min: 0, max: 100 },
    fraudRiskScore: { type: Number, default: 0, min: 0, max: 100 },
    recommendations: [String],
    lastAnalyzed: { type: Date, default: Date.now }
  },
  alerts: [{
    type: {
      type: String,
      enum: ['risk', 'fraud', 'concentration', 'volatility'],
      required: true
    },
    message: { type: String, required: true },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      required: true
    },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Index for efficient queries
PortfolioSchema.index({ userId: 1, isActive: 1 });
PortfolioSchema.index({ 'holdings.symbol': 1 });

// Calculate portfolio totals before saving
PortfolioSchema.pre('save', function(next) {
  if (this.holdings && this.holdings.length > 0) {
    this.totalValue = this.holdings.reduce((sum, holding) => 
      sum + (holding.quantity * holding.currentPrice), 0);
    
    this.totalInvestment = this.holdings.reduce((sum, holding) => 
      sum + (holding.quantity * holding.avgPrice), 0);
    
    this.totalGainLoss = this.totalValue - this.totalInvestment;
    
    this.totalGainLossPercentage = this.totalInvestment > 0 
      ? (this.totalGainLoss / this.totalInvestment) * 100 
      : 0;
  }
  next();
});

export default mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);