import { Grid, Paper, Typography, Box, IconButton, Card, CardContent, LinearProgress } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';

const data = [
  { name: 'Jan', sales: 4000, revenue: 2400, profit: 1800 },
  { name: 'Feb', sales: 3000, revenue: 1398, profit: 1000 },
  { name: 'Mar', sales: 2000, revenue: 9800, profit: 5000 },
  { name: 'Apr', sales: 2780, revenue: 3908, profit: 2000 },
  { name: 'May', sales: 1890, revenue: 4800, profit: 2500 },
  { name: 'Jun', sales: 2390, revenue: 3800, profit: 1900 },
  { name: 'Jul', sales: 3490, revenue: 4300, profit: 2300 },
];

const statsData = [
  {
    title: 'Total Revenue',
    value: '$54,890',
    change: '+14%',
    icon: <AttachMoney />,
    trend: 'up',
    color: 'primary.main',
    progress: 78,
  },
  {
    title: 'Total Sales',
    value: '2,345',
    change: '+21%',
    icon: <ShoppingCart />,
    trend: 'up',
    color: 'success.main',
    progress: 65,
  },
  {
    title: 'New Users',
    value: '321',
    change: '+28%',
    icon: <People />,
    trend: 'up',
    color: 'secondary.main',
    progress: 85,
  },
  {
    title: 'Growth Rate',
    value: '32%',
    change: '-12%',
    icon: <TrendingUp />,
    trend: 'down',
    color: 'error.main',
    progress: 32,
  },
];

const StatCard = ({ title, value, change, icon, trend, color, progress }: any) => (
  <Card
    sx={{
      height: '100%',
      position: 'relative',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '4px',
        backgroundColor: color,
        borderTopRightRadius: 'inherit',
        borderTopLeftRadius: 'inherit',
      },
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '12px',
            backgroundColor: `${color}15`,
            color: color,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" sx={{ my: 1 }}>
            {value}
          </Typography>
        </Box>
        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {trend === 'up' ? (
          <ArrowUpward sx={{ color: 'success.main', fontSize: 20, mr: 0.5 }} />
        ) : (
          <ArrowDownward sx={{ color: 'error.main', fontSize: 20, mr: 0.5 }} />
        )}
        <Typography
          variant="body2"
          color={trend === 'up' ? 'success.main' : 'error.main'}
          sx={{ mr: 1, fontWeight: 600 }}
        >
          {change}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          vs last month
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: `${color}15`,
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
          },
        }}
      />
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">Revenue Overview</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monthly revenue statistics
                  </Typography>
                </Box>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366F1"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Line type="monotone" dataKey="profit" stroke="#10B981" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">Sales Distribution</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Weekly sales overview
                  </Typography>
                </Box>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="sales"
                    fill="#EC4899"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 