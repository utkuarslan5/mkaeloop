import { defineUserSignupFields } from "wasp/server/auth";

export const userSignupFields = defineUserSignupFields({
  username: (data) => {
    if (!data.username) {
      throw new Error("Username is required");
    }
    return data.username;
  },
  profileImage: (data) => {
    if (!data.profileImage) {
      return "/default.jpg";
    }
    return data.profileImage;
  },
});
