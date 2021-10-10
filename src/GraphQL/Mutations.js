import { gql } from "graphql-request";

export const CreateUser = gql`
  mutation createUser($data: CreateUserInput) {
    createUser(data: $data) {
      id
    }
  }
`;

export const UpdateUser = gql`
  mutation updateUser($data: UpdateUserInput) {
    updateUser(data: $data) {
      id
    }
  }
`;

export const deleteUser = gql`
  mutation deleteUser($data: DeleteUserInput) {
    deleteUser(data: $data)
  }
`;

export const enableUser = gql`
  mutation enableUser($data: DeleteUserInput) {
    enableUser(data: $data)
  }
`;

export const createController = gql`
  mutation createController($data: CreateControllerModelInput) {
    createController(data: $data) {
      id
    }
  }
`;

export const deleteFailedPlan = gql`
  mutation deleteFailedPlan($data: DeletePlanParseFailedMessageInput) {
    deleteFailedPlan(data: $data)
  }
`;

export const acceptProject = gql`
  mutation acceptProject($data: AcceptRejectProjectInput) {
    acceptProject(data: $data)
  }
`;

export const rejectProject = gql`
  mutation rejectProject($data: AcceptRejectProjectInput) {
    rejectProject(data: $data)
  }
`;

export const updateCommune = gql`
  mutation updateCommune($data: UpdateCommuneInput) {
    updateCommune(data: $data) {
      id
    }
  }
`;

export const createProject = gql`
  mutation createProject($data: CreateProjectInput) {
    createProject(data: $data)
  }
`;

export const deleteController = gql`
  mutation deleteController($cid: String!) {
    deleteController(cid: $cid)
  }
`;

export const enableController = gql`
  mutation enableController($cid: String!) {
    enableController(cid: $cid)
  }
`;

export const updateProject = gql`
  mutation updateProject($data: CreateProjectInput) {
    updateProject(data: $data)
  }
`;

export const setVehIntergreen = gql`
  mutation setVehIntergreen($data: SetVehicleIntergreenInput) {
    setVehIntergreen(data: $data)
  }
`;

export const createCompany = gql`
  mutation createCompany($data: CreateCompanyInput) {
    createCompany(data: $data) {
      id
    }
  }
`;

export const deleteCompany = gql`
  mutation deleteCompany($data: DeleteCompanyInput) {
    deleteCompany(data: $data)
  }
`;

export const enableCompany = gql`
  mutation enableCompany($data: DeleteCompanyInput) {
    enableCompany(data: $data)
  }
`;

export const computeTables = gql`
  mutation computeTables($data: GetProjectInput) {
    computeTables(data: $data)
  }
`;

export const syncProject = gql`
  mutation syncProject($data: GetProjectInput) {
    syncProject(data: $data) {
      oid
      code
      message
      date
    }
  }
`;
