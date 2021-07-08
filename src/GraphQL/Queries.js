import { gql } from "graphql-request";

export const GetUsers = gql`
  {
    users {
      id
      area
      company {
        id
        name
      }
      email
      fullName
      isAdmin
      role
    }
  }
`;

export const GetCompanies = gql`
  {
    companies {
      name
    }
  }
`;

export const GetLogs = gql`
  {
    actionsLogs {
      action
      date
      user
    }
  }
`;

export const GetCommunes = gql`
  {
    communes {
      id
      code
      maintainer {
        id
        name
      }
      name
      userInCharge {
        id
        fullName
        email
      }
    }
  }
`;

export const GetControllers = gql`
  {
    controllers {
      id
      model
      checksum
      company {
        name
      }
      date
      firmwareVersion
    }
  }
`;

export const GetFailedPlans2 = gql`
  {
    failedPlans {
      id
      date
    }
  }
`;

export const GetFailedPlans = gql`
  query failedPlans($first: Int, $after: String) {
    failedPlans(first: $first, after: $after) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          date
          plans
        }
      }
    }
  }
`;

export const GetFailedPlan = gql`
  query failedPlan($mid: String!) {
    failedPlan(mid: $mid) {
      plans
    }
  }
`;

const project = ` {
  oid
  metadata {
    status
    commune {
      code
      name
      userInCharge {
        area
        email
        fullName
        role
      }
      maintainer {
        name
      }
    }
    img {
      data
    }
    installationCompany {
      name
    }
    installationDate
    localDetector
    pdfData {
      data
    }
    pedestrianDemand
    pedestrianFacility
    scootDetector
    statusDate
    statusUser {
      fullName
    }
    version
  }
  observation {
    message
  }
  otu {
    junctions {
      jid
      intergreens {
        phfrom
        phto
        value
      }
      sequence {
        phid
        phidSystem
        type
      }
      metadata {
        addressReference
        location {
          coordinates
        }
        useDefaultVi4
      }
      phases
      plans {
        cycle
        plid
        greenStart {
          phid
          value
        }
        pedestrianGreen {
          phid
          value
        }
        phaseStart {
          phid
          value
        }
        systemStart {
          phid
          value
        }
        vehicleGreen {
          phid
          value
        }
        pedestrianIntergreen {
          phfrom
          phto
          value
        }
        vehicleIntergreen {
          phfrom
          phto
          value
        }
      }
    }
    metadata {
      answer
      control
      ipAddress
      linkOwner
      linkType
      netmask
      serial
    }
    programs {
      day
      plan
      time
    }
  }
  controller {
    gps
    model {
      checksum
      company {
        name
      }
      firmwareVersion
      model
    }
  }
  headers {
    hal
    led
    type
  }
  poles {
    hooks
    pedestrian
    vehicular
  }
  ups {
    brand
    capacity
    chargeDuration
    model
    serial
  }
}`;

export const GetProject =
  gql`
  query project($oid: String!, $status: String!) {
    project(oid: $oid, status: $status)` +
  project +
  ` 
  }
`;

export const CheckUpdates = gql`
  query project($oid: String!, $status: String!) {
    project(oid: $oid, status: $status) {
      oid
    }
  }
`;

export const GetCoordinates = gql`
  query locations($status: String!) {
    locations(status: $status) {
      jid
      lat
      lon
    }
  }
`;

export const GetRequests = gql`
  query projects(
    $first: RangeScalar
    $after: String
    $metadata_Status: String!
    $metadata_Version: String!
  ) {
    projects(
      first: $first
      after: $after
      metadata_Status: $metadata_Status
      metadata_Version: $metadata_Version
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          oid
          metadata {
            status
            statusDate
          }
        }
      }
    }
  }
`;

export const CheckOtuExists = gql`
  query checkOtuExists($oid: String!) {
    checkOtuExists(oid: $oid)
  }
`;

export const GetVersions = gql`
  query versions($oid: String!) {
    versions(oid: $oid) {
      vid
      date
      comment {
        author {
          id
        }
        date
        message
      }
    }
  }
`;

export const GetVersion =
  gql`
  query version($oid: String!, $vid: String!) {
    version(oid: $oid, vid: $vid) ` +
  project +
  `
  }
`;
