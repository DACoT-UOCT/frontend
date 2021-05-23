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
  mutation acceptProject($projectDetails: GetProjectInput) {
    acceptProject(projectDetails: $projectDetails)
  }
`;

export const rejectProject = gql`
  mutation rejectProject($projectDetails: GetProjectInput) {
    rejectProject(projectDetails: $projectDetails)
  }
`;

export const updateCommune = gql`
  mutation updateCommune($communeDetails: UpdateCommuneInput) {
    updateCommune(communeDetails: $communeDetails) {
      id
    }
  }
`;

export const createProject = gql`
  mutation createProject($projectDetails: CreateProjectInput) {
    createProject(projectDetails: $projectDetails) {
      oid
    }
  }
`;

export const deleteController = gql`
  mutation deleteController($cid: String!) {
    deleteController(cid: $cid)
  }
`;
