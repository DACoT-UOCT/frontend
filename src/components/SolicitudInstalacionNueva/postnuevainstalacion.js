const post_body = {
  metadata: {
    version: "base",
    maintainer: "",
    status: "NEW",
    status_date: { $date: 1603758436026 },
    status_user: "",
    installation_date: { $date: 1602635236000 },
    commune: "Lo Barnechea",
    region: "Región Metropolitana de Santiago",
    img: "data:image/jpeg;base64,/9j/4AAQSkZJ...",
    pdf_data: "data:image/jpeg;base64,/9j/4AAQSkZJ...",
    pedestrian_demand: false,
    pedestrian_facility: false,
    local_detector: true,
    scoot_detector: true,
  },
  otu: {
    oid: "X123410",
    metadata: {
      serial: "123",
      ip_address: "123",
      netmask: "123",
      control: 2,
      answer: 1,
      link_type: "Analogo",
      link_owner: "Propio",
    },
    junctions: [
      {
        jid: "J123411",
        metadata: { location: "pointField", address_reference: "ubicacion j" },
      },
      {
        jid: "J123412",
        metadata: { location: "pointField", address_reference: "ubicacion j2" },
      },
    ],
    sequences: [
      {
        seqid: 0,
        phases: [
          {
            phid: 1,
            stages: [
              { stid: "A", type: "Ciclista" },
              { stid: "B", type: "Vehicular" },
            ],
          },
          { phid: 2, stages: [{ stid: "A", type: "Ciclista" }] },
        ],
      },
      {
        seqid: 1,
        phases: [{ phid: 2, stages: [{ stid: "A", type: "Ciclista" }] }],
      },
    ],
    intergreens: [0, 4, 2, 0],
  },
  controller: {
    address_reference: "ubicacion controller",
    gps: false,
    model: {
      company: { name: "Siemens" },
      model: "ST950",
      firmware_version: "667 ISSUE 16",
      checksum: "C1D0401A",
      date: { $date: 185852312 },
    },
  },
  headers: [
    { hal: 0, led: 0, type: "L1" },
    { hal: 0, led: 0, type: "L2A" },
    { hal: 0, led: 3, type: "L2B" },
    { hal: 0, led: 0, type: "L2C" },
    { hal: 6, led: 0, type: "L3A" },
    { hal: 0, led: 0, type: "L3B" },
    { hal: 0, led: 0, type: "L4" },
    { hal: 0, led: 0, type: "L5" },
    { hal: 0, led: 0, type: "L6" },
    { hal: 0, led: 0, type: "Peatonal" },
    { hal: 0, led: 0, type: "Ciclista" },
  ],
  poles: { hooks: 2, vehicular: 2, pedestrian: 1 },
  observations: "observaciones de la instalacion",
  ups: {
    brand: "marca",
    model: "modelo",
    serial: "n serie",
    capacity: "capacidad",
    charge_duration: "duracion",
  },
};
