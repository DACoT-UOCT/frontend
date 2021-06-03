import { gql } from "graphql-request";

export const CreateUser = gql`
  mutation createUser($userDetails: CreateUserInput!) {
    createUser(userDetails: $userDetails) {
      id
    }
  }
`;

export const UpdateUser = gql`
  mutation updateUser($userDetails: UpdateUserInput!) {
    updateUser(userDetails: $userDetails) {
      id
    }
  }
`;

export const deleteUser = gql`
  mutation deleteUser($userDetails: DeleteUserInput!) {
    deleteUser(userDetails: $userDetails)
  }
`;

export const createController = gql`
  mutation createController($controllerDetails: CreateControllerModelInput) {
    createController(controllerDetails: $controllerDetails) {
      id
    }
  }
`;

export const deleteFailedPlan = gql`
  mutation deleteFailedPlan(
    $messageDetails: DeletePlanParseFailedMessageInput
  ) {
    deleteFailedPlan(messageDetails: $messageDetails)
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

export const updateProject = gql`
  mutation updateProject($data: CreateProjectInput) {
    updateProject(data: $data)
  }
`;

export const setVehIntergreen = gql`
  mutation setDefaultVehIntergreen($data: SetVehicleIntergreenInput) {
    setDefaultVehIntergreen(data: $data)
  }
`;
