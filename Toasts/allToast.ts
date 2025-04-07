import Toast from "react-native-toast-message";

export const addBarberErrorToast = () => {
  Toast.show({
    type: "error",
    visibilityTime: 2000,
    text1: "Errors",
    text2: "Please fill all the fields",
    text1Style: {
      fontSize: 15,
      fontFamily: "park-m"
    },
    text2Style: {
      fontSize: 13,
      fontFamily: "pop-m"
    }
  });
};

export const addBarberSuccessToast = () => {
  Toast.show({
    type: "success",
    visibilityTime: 2000,
    text1: "Success",
    text2: "Barber added successfully",
    text1Style: {
      fontSize: 15,
      fontFamily: "park-m"
    },
    text2Style: {
      fontSize: 13,
      fontFamily: "pop-m"
    }
  });
};

export const serviceAddedSuccessfullyToast = () => {
  Toast.show({
    type: "success",
    visibilityTime: 2000,
    text1: "Success",
    text2: "Service added successfully",
    text1Style: {
      fontSize: 15,
      fontFamily: "park-m"
    },
    text2Style: {
      fontSize: 13,
      fontFamily: "pop-m"
    }
  });
};

export const barberDeletedSuccessToast = () => {
  Toast.show({
    type: "success",
    visibilityTime: 2000,
    text1: "Success",
    text2: "Barber deleted successfully",
    text1Style: {
      fontSize: 15,
      fontFamily: "park-m"
    },
    text2Style: {
      fontSize: 13,
      fontFamily: "pop-m"
    }
  });
};

export const appointmentConfirmedToast = () => {
  Toast.show({
    type: "success",
    visibilityTime: 2000,
    text1: "Success",
    text2: "Appointment confirmed successfully",
    text1Style: {
      fontSize: 15,
      fontFamily: "park-m"
    },
    text2Style: {
      fontSize: 13,
      fontFamily: "pop-m"
    }
  });
};

export const appointmentRejectedToast = () => {
  Toast.show({
    type: "error",
    visibilityTime: 2000,
    text1: "Success",
    text2: "Appointment rejected successfully",
    text1Style: {
      fontSize: 15,
      fontFamily: "park-m"
    },
    text2Style: {
      fontSize: 13,
      fontFamily: "pop-m"
    }
  });
};

export const appointmentCompletedToast = () => {
  Toast.show({
    type: "success",
    visibilityTime: 2000,
    text1: "Success",
    text2: "Appointment completed successfully",
    text1Style: {
      fontSize: 15,
      fontFamily: "park-m"
    },
    text2Style: {
      fontSize: 13,
      fontFamily: "pop-m"
    }
  });
};
