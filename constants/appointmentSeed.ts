// Pre-seed data for barber shop appointments

const appointmentData = [
  {
    user_id: "2f7c8e1a-9b5d-4f3e-8c7a-6d5b4c3a2f1e",
    barber_id: "7a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    service_id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    starttime: "2025-04-05T10:00:00.000Z",
    endtime: "2025-04-05T10:45:00.000Z",
    status: "pending",
    user_name: "John Smith",
    service_name: "Haircut",
    barber_name: "Mike Johnson"
  },
  {
    user_id: "3e4f5a6b-7c8d-9e0f-1a2b-3c4d5e6f7a8b",
    barber_id: "7a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    service_id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
    starttime: "2025-04-05T11:00:00.000Z",
    endtime: "2025-04-05T11:30:00.000Z",
    status: "pending",
    user_name: "Emma Davis",
    service_name: "Beard Trim",
    barber_name: "Mike Johnson"
  },
  {
    user_id: "4a5b6c7d-8e9f-0a1b-2c3d-4e5f6a7b8c9d",
    barber_id: "8b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
    service_id: "c3d4e5f6-a7b8-c9d0-e1f2-3a4b5c6d7e8f",
    starttime: "2025-04-05T13:00:00.000Z",
    endtime: "2025-04-05T14:30:00.000Z",
    status: "confirmed",
    user_name: "Sophia Rodriguez",
    service_name: "Hair Color",
    barber_name: "Sarah Wilson"
  },
  {
    user_id: "5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e",
    barber_id: "9c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
    service_id: "d4e5f6a7-b8c9-d0e1-f2a3-b4c5d6e7f8a9",
    starttime: "2025-04-05T15:00:00.000Z",
    endtime: "2025-04-05T15:45:00.000Z",
    status: "pending",
    user_name: "James Brown",
    service_name: "Shave",
    barber_name: "Alex Chen"
  },
  {
    user_id: "6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f",
    barber_id: "0d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a",
    service_id: "e5f6a7b8-c9d0-e1f2-a3b4-c5d6e7f8a9b0",
    starttime: "2025-04-06T09:30:00.000Z",
    endtime: "2025-04-06T10:15:00.000Z",
    status: "confirmed",
    user_name: "Linda Thompson",
    service_name: "Women's Haircut",
    barber_name: "Rebecca Lee"
  },
  {
    user_id: "7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a",
    barber_id: "1e5f6a7b-8c9d-0e1f-2a3b-4c5d6e7f8a9b",
    service_id: "f6a7b8c9-d0e1-f2a3-b4c5-d6e7f8a9b0c1",
    starttime: "2025-04-06T11:00:00.000Z",
    endtime: "2025-04-06T12:30:00.000Z",
    status: "confirmed",
    user_name: "Robert Miller",
    service_name: "Hair Treatment",
    barber_name: "David Garcia"
  },
  {
    user_id: "8e9f0a1b-2c3d-4e5f-6a7b-8c9d0e1f2a3b",
    barber_id: "2f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0c",
    service_id: "a7b8c9d0-e1f2-a3b4-c5d6-e7f8a9b0c1d2",
    starttime: "2025-04-06T14:00:00.000Z",
    endtime: "2025-04-06T14:30:00.000Z",
    status: "pending",
    user_name: "Jennifer Parker",
    service_name: "Bang Trim",
    barber_name: "Michelle Taylor"
  },
  {
    user_id: "9f0a1b2c-3d4e-5f6a-7b8c-9d0e1f2a3b4c",
    barber_id: "3a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d",
    service_id: "b8c9d0e1-f2a3-b4c5-d6e7-f8a9b0c1d2e3",
    starttime: "2025-04-06T16:00:00.000Z",
    endtime: "2025-04-06T17:00:00.000Z",
    status: "confirmed",
    user_name: "Michael Johnson",
    service_name: "Hair Styling",
    barber_name: "Chris Martin"
  },
  {
    user_id: "0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    barber_id: "4b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
    service_id: "c9d0e1f2-a3b4-c5d6-e7f8-a9b0c1d2e3f4",
    starttime: "2025-04-07T10:00:00.000Z",
    endtime: "2025-04-07T11:00:00.000Z",
    status: "confirmed",
    user_name: "Elizabeth Wilson",
    service_name: "Highlights",
    barber_name: "Jessica Adams"
  },
  {
    user_id: "1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
    barber_id: "5c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f",
    service_id: "d0e1f2a3-b4c5-d6e7-f8a9-b0c1d2e3f4a5",
    starttime: "2025-04-07T13:30:00.000Z",
    endtime: "2025-04-07T14:00:00.000Z",
    status: "pending",
    user_name: "William Davis",
    service_name: "Mustache Trim",
    barber_name: "Thomas Wright"
  },
  {
    user_id: "2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
    barber_id: "7a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    service_id: "e1f2a3b4-c5d6-e7f8-a9b0-c1d2e3f4a5b6",
    starttime: "2025-04-08T09:00:00.000Z",
    endtime: "2025-04-08T09:45:00.000Z",
    status: "confirmed",
    user_name: "Amanda Lopez",
    service_name: "Haircut",
    barber_name: "Mike Johnson"
  },
  {
    user_id: "3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a",
    barber_id: "8b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
    service_id: "f2a3b4c5-d6e7-f8a9-b0c1-d2e3f4a5b6c7",
    starttime: "2025-04-08T11:15:00.000Z",
    endtime: "2025-04-08T12:00:00.000Z",
    status: "confirmed",
    user_name: "Daniel Thompson",
    service_name: "Head Massage",
    barber_name: "Sarah Wilson"
  }
];

export default appointmentData;
