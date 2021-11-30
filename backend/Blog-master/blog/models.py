from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(null=True, auto_now_add=True)
    updated_at = models.DateTimeField(null=True, auto_now=True)
    on_deleted = models.BooleanField()

    # def __str__(self):
    #     return self.title


# STATUS = (
#     (0, "Draft"),
#     (1, "Publish")
# )


class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=False)
    content = models.TextField()
    public = models.BooleanField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_on = models.DateTimeField(null=True, auto_now_add=True)
    updated_on = models.DateTimeField(null=True, auto_now=True)
    # status = models.IntegerField(choices=STATUS, default=0)
    on_deleted = models.BooleanField()

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title
