export interface Task {
  id: number,
  task: string,
  status: Status,
  priority: Level,
  startDate: number,
  timeTaken: number,
  description: string,
  category: Category
}

export enum Status {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed"
}

export enum Level {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High"
}

export enum RouteList {
  DASHBOARD = "Dashboard",
  ADD_TASK = "Add New Task",
  VIEW_TASKS = "View Tasks",
  LOGOUT = "Logout"
}

export enum Category {
  HOME = "Home and Household",
  WORK = "Work and Career",
  ENTERTAINMENT = "Entertainment and Leisure",
  HEALTH = "Health and Wellness",
  FINANCE = "Finance and Budgeting",
  ERRANDS = "Errands and Admin",
  EVENTS = "Events and Appointments",
  GOALS = "Goals and Aims",
  OTHER = "Other"
}
