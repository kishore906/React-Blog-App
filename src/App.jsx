import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PostsProvider } from "./contexts/PostsContext";
import { AuthProvider } from "./contexts/AuthContext";

import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import BlogInfo from "./components/BlogInfo";
import NewPost from "./components/NewPost";
import EditBlog from "./components/EditBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route
              path="blogs/:id"
              element={
                <ProtectedRoute>
                  <BlogInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path="newPost"
              element={
                <ProtectedRoute>
                  <NewPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="editBlog/:id"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </PostsProvider>
    </AuthProvider>
  );
}
export default App;
