# views.py

from rest_framework import generics, permissions, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .models import BlogPost, Comment
from .permission import IsAuthor, IsAuthorOrReadOnly
from .serializers import BlogPostSerializer, BlogPostCreateUpdateSerializer, CommentSerializer, CommentPostSerializer


class BlogPostListView(generics.ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.AllowAny]

# class BlogPostDetailView(generics.RetrieveAPIView):
#     queryset = BlogPost.objects.all()
#     serializer_class = BlogPostSerializer
#     permission_classes = [permissions.AllowAny]


class BlogPostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1  # Increment the views count
        instance.save()
        return super().get(request, *args, **kwargs)
class BlogPostCreateView(generics.CreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthor]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class BlogPostUpdateView(generics.UpdateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        return BlogPost.objects.filter(author=self.request.user)


# class BlogPostViewSet(viewsets.ModelViewSet):
#     queryset = BlogPost.objects.all()
#     serializer_class = BlogPostSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#
#     def retrieve(self, request, *args, **kwargs):
#         instance = self.get_object()
#         instance.views += 1
#         instance.save(update_fields=['views'])  # Save only the updated field
#         serializer = self.get_serializer(instance)
#         return Response(serializer.data)

#
# class CommentListCreateAPIView(generics.ListCreateAPIView):
#     queryset = Comment.objects.all()
#
#     def get_queryset(self):
#         post_id = self.kwargs.get('pk')
#         return Comment.objects.filter(post_id=post_id)
#
#     def perform_create(self, serializer):
#         post_id = self.kwargs.get('pk')
#         blog_post = BlogPost.objects.get(pk=post_id)
#         serializer.save(author=self.request.user, post=blog_post)
#
#     def get_serializer_class(self):
#
#         if self.request.method == 'POST':
#             return CommentSerializerCreate
#         return CommentSerializer
#
#
# class CommentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#
#     def get_object(self):
#         # Retrieve the comment ID from the URL parameters
#         comment_id = self.kwargs.get('comment_pk')
#
#         return Comment.objects.get(pk=comment_id)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id)


