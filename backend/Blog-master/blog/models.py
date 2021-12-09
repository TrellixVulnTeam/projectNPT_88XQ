from django.db import models
from django.contrib.auth.models import User
from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=255, null=False)  # id
    created_at = models.DateTimeField(null=True, auto_now_add=True)
    updated_at = models.DateTimeField(null=True, auto_now=True)
    on_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'category'


class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # id
    title = models.CharField(max_length=255, null=False)
    content = models.TextField()
    public = models.BooleanField(default=False)
    category = models.ForeignKey(Category, related_name="blog", on_delete=models.CASCADE)
    created_at = models.DateTimeField(null=True, auto_now_add=True)
    updated_at = models.DateTimeField(null=True, auto_now=True)
    on_deleted = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        db_table = 'blog'

    def __str__(self):
        return self.title
