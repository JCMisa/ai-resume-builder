import AddResume from "./_components/AddResume";
import ResumeList from "./_components/ResumeList";

const Dashboard = () => {
  return (
    <div className="p-10 md:px-10 lg:px-22">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p className="text-xs">
        Level up your job hunt: Start your AI Resume now!
      </p>
      <div className="flex justify-start flex-col sm:flex-row gap-5">
        <AddResume />
        <ResumeList />
      </div>
    </div>
  );
};

export default Dashboard;
