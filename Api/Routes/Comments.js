import  express  from "express";
import { addComment, deleteComment, getComments} from "../Controllers/comment.js";
import {verifyToken} from "../VerifyToken.js";
const router = express.Router();



router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);

export default router;
