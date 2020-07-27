import React from "react";
import { connect } from "react-redux";

export const createTable = (
  key,
  {
    defaultPageSize = 10,
    fetchOnMount = true,
    columns,
    list,
    listSelector = () => {},
  } = {}
) => Component => {
  class ComponentWithTable extends React.Component {
    componentDidMount() {
      if (fetchOnMount) {
        this.props.dispatch(
          list({
            query: {
              _limit: defaultPageSize,
              _offset: 0,
            },
          })
        );
      }
    }

    handleChange = (pagination = {}, filters = {}, sort = {}) => {
      // fetching data only when list is provided
      if (!list) return;

      // query could be changed from outside
      const query = { ...this.props.listState.request.query };
      const { current = 1, pageSize = defaultPageSize } = pagination;
      query._limit = pageSize;
      query._offset = (current - 1) * pageSize;

      Object.keys(filters)
        .filter(k => Boolean(filters[k]))
        .forEach(k => {
          if (!query.filter) query.filter = {};
          query.filter[k] = filters[k];
        });

      const { column, field, order } = sort;
      if (column)
        query.sort = (order === "ascend" ? "" : "-") + (column.key || field);
      else delete query.sort;

      this.props.dispatch(
        list({
          ...this.props.listState.request,
          query,
        })
      );
    };

    render() {
      const { listState = {}, ...rest } = this.props;
      const { loading = false, result = [], total, request = {} } = listState;
      const { limit = 10, offset = 0 } = request.query || {};
      const pagination = {};

      // pagination from api data
      if (total) {
        pagination.current = Math.floor(offset / limit + 1);
        pagination.pageSize = limit;
        pagination.total = total;
      }

      const table = {
        pagination,
        rowKey: "id",
        loading,
        columns,
        dataSource: result,
        onChange: this.handleChange,
      };

      return <Component table={table} listState={listState} {...rest} />;
    }
  }

  const Connected = connect((state, props) => ({
    listState: listSelector(state),
  }))(ComponentWithTable);

  return Connected;
};
