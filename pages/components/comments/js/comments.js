     // Sample data
        let commentsData = [
            {
                id: 1,
                author: "Michael Weber",
                avatar: "MW",
                time: "vor 1 Stunde",
                text: "Sieht großartig aus! Endlich kann man richtige Diskussionen führen. 👏",
                likes: 42,
                liked: false,
                replies: [
                    {
                        id: 11,
                        author: "Anna Schmidt",
                        avatar: "AS",
                        time: "vor 45 Min",
                        text: "Stimme zu! Das hat gefehlt.",
                        likes: 12,
                        liked: false
                    },
                    {
                        id: 12,
                        author: "Sarah Klein",
                        avatar: "SK",
                        time: "vor 30 Min",
                        text: "Danke euch! 😊",
                        likes: 8,
                        liked: false,
                        verified: true
                    }
                ]
            },
            {
                id: 2,
                author: "Thomas Müller",
                avatar: "TM",
                time: "vor 2 Stunden",
                text: "Wie tief können die Kommentare verschachtelt werden?",
                likes: 28,
                liked: false,
                replies: [
                    {
                        id: 21,
                        author: "Sarah Klein",
                        avatar: "SK",
                        time: "vor 1 Stunde",
                        text: "Theoretisch unbegrenzt! Praktisch macht nach 3-4 Ebenen eine View-Änderung Sinn.",
                        likes: 15,
                        liked: false,
                        verified: true
                    }
                ]
            },
            {
                id: 3,
                author: "Lisa Meyer",
                avatar: "LM",
                time: "vor 3 Stunden",
                text: "Perfekt für Team-Diskussionen! Wann kommt das Live?",
                likes: 35,
                liked: false,
                replies: []
            },
            {
                id: 4,
                author: "Jan Becker",
                avatar: "JB",
                time: "vor 4 Stunden",
                text: "Super Feature! Habt ihr auch an Notifications gedacht?",
                likes: 19,
                liked: false,
                replies: []
            }
        ];

        let displayedComments = 4;
        let postLiked = false;
        let postLikesCount = 245;

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            renderComments();
            setupInputListeners();
        });

        // Render all comments
        function renderComments() {
            const commentsList = document.getElementById('commentsList');
            const visibleComments = commentsData.slice(0, displayedComments);

            commentsList.innerHTML = visibleComments.map(comment => createCommentHTML(comment)).join('');

            // Show/hide load more
            const loadMoreSection = document.getElementById('loadMoreSection');
            loadMoreSection.style.display = commentsData.length > displayedComments ? 'block' : 'none';

            updateCommentsCount();
        }

        // Create comment HTML
        function createCommentHTML(comment) {
            const repliesHTML = comment.replies && comment.replies.length > 0
                ? `<div class="replies">
                    ${comment.replies.map(reply => createReplyHTML(reply, comment.id)).join('')}
                   </div>`
                : '';

            return `
                <div class="comment" data-comment-id="${comment.id}">
                    <div class="avatar">${comment.avatar}</div>
                    <div class="comment-content">
                        <div class="comment-bubble">
                            <div class="comment-author">
                                ${comment.author}
                                ${comment.verified ? '<span class="verified-badge">✓</span>' : ''}
                            </div>
                            <div class="comment-text">${comment.text}</div>
                        </div>
                        <div class="comment-meta">
                            <span class="comment-action ${comment.liked ? 'liked' : ''}" onclick="toggleCommentLike(${comment.id})">
                                Gefällt mir
                            </span>
                            <span class="comment-action" onclick="toggleReplyInput(${comment.id})">
                                Antworten
                            </span>
                            ${comment.likes > 0 ? `<span class="comment-likes">👍 ${comment.likes}</span>` : ''}
                            <span class="comment-time">${comment.time}</span>
                        </div>
                    </div>
                </div>
                <div class="reply-input-wrapper" id="replyInput-${comment.id}">
                    <div class="avatar">DU</div>
                    <div class="comment-input-container">
                        <textarea 
                            class="comment-input" 
                            id="replyText-${comment.id}"
                            placeholder="Schreibe eine Antwort..."
                            rows="1"
                        ></textarea>
                        <div class="comment-actions">
                            <button class="comment-btn comment-btn-primary" onclick="addReply(${comment.id})">
                                Senden
                            </button>
                            <button class="comment-btn comment-btn-secondary" onclick="toggleReplyInput(${comment.id})">
                                Abbrechen
                            </button>
                        </div>
                    </div>
                </div>
                ${repliesHTML}
            `;
        }

        // Create reply HTML
        function createReplyHTML(reply, parentId) {
            return `
                <div class="reply" data-reply-id="${reply.id}">
                    <div class="avatar">${reply.avatar}</div>
                    <div class="comment-content">
                        <div class="comment-bubble">
                            <div class="comment-author">
                                ${reply.author}
                                ${reply.verified ? '<span class="verified-badge">✓</span>' : ''}
                            </div>
                            <div class="comment-text">${reply.text}</div>
                        </div>
                        <div class="comment-meta">
                            <span class="comment-action ${reply.liked ? 'liked' : ''}" onclick="toggleReplyLike(${parentId}, ${reply.id})">
                                Gefällt mir
                            </span>
                            <span class="comment-action" onclick="toggleReplyToReply(${parentId}, ${reply.id}, '${reply.author}')">
                                Antworten
                            </span>
                            ${reply.likes > 0 ? `<span class="comment-likes">👍 ${reply.likes}</span>` : ''}
                            <span class="comment-time">${reply.time}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Add main comment
        function addComment() {
            const input = document.getElementById('mainCommentInput');
            const text = input.value.trim();
            
            if (!text) return;

            const newComment = {
                id: Date.now(),
                author: "Du",
                avatar: "DU",
                time: "Gerade eben",
                text: text,
                likes: 0,
                liked: false,
                replies: []
            };

            commentsData.unshift(newComment);
            input.value = '';
            document.getElementById('mainCommentActions').style.display = 'none';
            document.getElementById('postCommentBtn').disabled = true;
            renderComments();
        }

        // Add reply
        function addReply(commentId) {
            const input = document.getElementById(`replyText-${commentId}`);
            const text = input.value.trim();
            
            if (!text) return;

            const comment = commentsData.find(c => c.id === commentId);
            if (!comment) return;

            const newReply = {
                id: Date.now(),
                author: "Du",
                avatar: "DU",
                time: "Gerade eben",
                text: text,
                likes: 0,
                liked: false
            };

            comment.replies.push(newReply);
            input.value = '';
            toggleReplyInput(commentId);
            renderComments();
        }

        // Toggle reply input
        function toggleReplyInput(commentId) {
            const replyWrapper = document.getElementById(`replyInput-${commentId}`);
            const isActive = replyWrapper.classList.contains('active');
            
            // Close all other reply inputs
            document.querySelectorAll('.reply-input-wrapper').forEach(el => {
                el.classList.remove('active');
            });

            if (!isActive) {
                replyWrapper.classList.add('active');
                document.getElementById(`replyText-${commentId}`).focus();
            }
        }

        // Toggle reply to reply
        function toggleReplyToReply(commentId, replyId, authorName) {
            const replyWrapper = document.getElementById(`replyInput-${commentId}`);
            const textarea = document.getElementById(`replyText-${commentId}`);
            
            replyWrapper.classList.add('active');
            textarea.value = `@${authorName} `;
            textarea.focus();
        }

        // Toggle like on comment
        function toggleCommentLike(commentId) {
            const comment = commentsData.find(c => c.id === commentId);
            if (comment) {
                comment.liked = !comment.liked;
                comment.likes += comment.liked ? 1 : -1;
                renderComments();
            }
        }

        // Toggle like on reply
        function toggleReplyLike(commentId, replyId) {
            const comment = commentsData.find(c => c.id === commentId);
            if (comment) {
                const reply = comment.replies.find(r => r.id === replyId);
                if (reply) {
                    reply.liked = !reply.liked;
                    reply.likes += reply.liked ? 1 : -1;
                    renderComments();
                }
            }
        }

        // Toggle post like
        function toggleLike() {
            postLiked = !postLiked;
            postLikesCount += postLiked ? 1 : -1;
            
            const likeBtn = document.getElementById('likeBtn');
            likeBtn.classList.toggle('active');
            document.getElementById('likesCount').textContent = postLikesCount;
        }

        // Focus comment input
        function focusCommentInput() {
            document.getElementById('mainCommentInput').focus();
        }

        // Cancel comment
        function cancelComment() {
            document.getElementById('mainCommentInput').value = '';
            document.getElementById('mainCommentActions').style.display = 'none';
            document.getElementById('postCommentBtn').disabled = true;
        }

        // Setup input listeners
        function setupInputListeners() {
            const mainInput = document.getElementById('mainCommentInput');
            const postBtn = document.getElementById('postCommentBtn');
            const actions = document.getElementById('mainCommentActions');

            mainInput.addEventListener('focus', () => {
                actions.style.display = 'flex';
            });

            mainInput.addEventListener('input', () => {
                postBtn.disabled = mainInput.value.trim().length === 0;
            });

            mainInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!postBtn.disabled) {
                        addComment();
                    }
                }
            });
        }

        // Load more comments
        function loadMoreComments() {
            displayedComments += 4;
            renderComments();
        }

        // Update comments count
        function updateCommentsCount() {
            let total = commentsData.length;
            commentsData.forEach(comment => {
                total += comment.replies.length;
            });
            document.getElementById('commentsCount').textContent = total;
        }