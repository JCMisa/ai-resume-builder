import AddResume from "./_components/AddResume";

const Dashboard = () => {
  return (
    <div className="p-10 md:px-10 lg:px-22">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p className="text-xs">Start creating AI Resume for your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <AddResume />
      </div>
    </div>
  );
};

export default Dashboard;
