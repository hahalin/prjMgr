import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    });
  }

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    });
  }

  function handleAddProject(projectData) {
    const projectId = Math.random();
    setProjectState(prevState => {
      const newProject = {
        ...projectData,
        id: projectId
      }
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        selectedProjectId: undefined
      }
    });
  }

  const handleCancelAddProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    });
  }

  const handleDeleteProject=()=>{
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects:prevState.projects.filter((project)=> project.id!==prevState.selectedProjectId)
      }
    });
  }

  const selectedProject=projectState.projects.find(project=>project.id===projectState.selectedProjectId);

  let content=<SelectedProject project={selectedProject} onDelete={handleDeleteProject} ></SelectedProject>

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}></NewProject>
  }
  else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} ></NoProjectSelected>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onStartAddProject={handleStartAddProject} 
        projects={projectState.projects} 
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
