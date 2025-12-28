import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  subscription?: {
    id: string;
    status: 'active' | 'inactive' | 'cancelled' | 'past_due';
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  };
  preferences: {
    riskTolerance: 'low' | 'medium' | 'high';
    investmentHorizon: 'short' | 'medium' | 'long';
    notifications: {
      email: boolean;
      whatsapp: boolean;
      push: boolean;
    };
    darkMode: boolean;
  };
  profile: {
    age?: number;
    experience: 'beginner' | 'intermediate' | 'advanced';
    monthlyIncome?: number;
    investmentGoals: string[];
  };
  riskProfile: {
    overallScore: number;
    emotionalStability: number;
    disciplineScore: number;
    lastUpdated: Date;
  };
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phone: {
    type: String,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
  },
  avatar: String,
  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free'
  },
  subscription: {
    id: String,
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled', 'past_due'],
      default: 'inactive'
    },
    currentPeriodEnd: Date,
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false
    }
  },
  preferences: {
    riskTolerance: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    investmentHorizon: {
      type: String,
      enum: ['short', 'medium', 'long'],
      default: 'long'
    },
    notifications: {
      email: { type: Boolean, default: true },
      whatsapp: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    darkMode: { type: Boolean, default: false }
  },
  profile: {
    age: {
      type: Number,
      min: [18, 'Must be at least 18 years old'],
      max: [100, 'Age cannot exceed 100']
    },
    experience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    monthlyIncome: {
      type: Number,
      min: [0, 'Income cannot be negative']
    },
    investmentGoals: [String]
  },
  riskProfile: {
    overallScore: { type: Number, default: 50, min: 0, max: 100 },
    emotionalStability: { type: Number, default: 50, min: 0, max: 100 },
    disciplineScore: { type: Number, default: 50, min: 0, max: 100 },
    lastUpdated: { type: Date, default: Date.now }
  },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  lastLogin: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);