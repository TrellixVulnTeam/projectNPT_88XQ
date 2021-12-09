from rest_framework.views import APIView

from rest_framework import pagination
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

class PaginationAPIView(APIView):
    queryset = None
    serializer_class = None
    pagination_class = None

    @property
    def paginator(self):
        """
        The paginator instance associated with the view, or `None`.
        """
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        """
        Return a single page of results, or `None` if pagination is disabled.
        """
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        """
        Return a paginated style `Response` object for the given output data.
        """
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

class CustomPagination(pagination.PageNumberPagination):
    page_size = 2
    page_size_query_param = 'perpage'
    def get_paginated_response(self, data):
        response = Response(data)
        response['count'] = self.page.paginator.count
        response['current'] = self.page.number
        response['next'] = self.get_next_link()
        response['previous'] = self.get_previous_link()
        pagination = {
        'page': self.page.number,
        'total_page': self.page.paginator.num_pages,
        'total_row': self.page.paginator.count,
        'perpage': self.page.paginator.per_page

        }
        content = {'pagination': pagination, 'data': data}
        return Response(content)
