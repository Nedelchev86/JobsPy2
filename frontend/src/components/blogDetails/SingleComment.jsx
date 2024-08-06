import {CLOUDINARY_URL} from "../../config";

export default function SingleComment({comment}) {
    return (
        <li>
            <div className="comment-img">
                {comment.author.profile_picture && <img src={`${CLOUDINARY_URL}${comment.author.profile_picture}`} className="rounded-circle" alt="img" />}
                {comment.author.image && <img src={`${CLOUDINARY_URL}${comment.author.image}`} className="rounded-circle" alt="img" />}
            </div>
            <div className="comment-desc">
                <div className="desc-top">
                    <h6>
                        {comment.author.first_name} {comment.author.last_name}
                    </h6>
                    <span className="date">{comment.created_at}</span>
                    <a href="#" className="reply-link">
                        <i className="lni lni-reply"></i>Reply
                    </a>
                </div>
                <p>{comment.content}</p>
            </div>
        </li>
    );
}
