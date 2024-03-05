export const adminSignup = (req, res) => {
  res.json({ status: "Admin Sign Up" });
};

// @middleware -> validate user data and user role, access token
export const adminSignIn = (req, res) => {
  res.json({ status: "Admin Sign In" });
};
