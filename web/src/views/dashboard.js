import Typography from '@mui/material/Typography';

const DashboardPage = () => {
  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: 2
        }}
      >
        You're logged in
      </Typography>
    </div>
  );
};

export default DashboardPage;
