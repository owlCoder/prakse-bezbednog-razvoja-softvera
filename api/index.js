import express from 'express';
import cors from 'cors';
import config from './config.js';

// Import user API route into server
import userRoute from './Routes/user.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
/// Users route
app.use('/api', userRoute);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);
