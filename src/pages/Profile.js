const Profile = ({ user }) => {
  return (
    <section>
      <h1>Profile</h1>
      <p>name: {user.displayName}</p>
      <p>email: {user.email}</p>
      <img src={user.photoURL} alt="profile" />
    </section>
  );
};

export default Profile;
