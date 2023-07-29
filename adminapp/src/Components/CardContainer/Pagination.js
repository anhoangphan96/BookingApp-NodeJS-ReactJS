import styles from "./Pagination.module.css";

const Pagination = (props) => {
  const listLength = props.listLength;
  return (
    <tr>
      <td colSpan={9} className={styles.lastRow}>
        <div className={styles.pagination}>
          <span>
            1 - {listLength} of {listLength}
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`icon icon-tabler icon-tabler-chevron-left ${styles.iconPaging} `}
              width={18}
              height={18}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 6l-6 6l6 6"></path>
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`icon icon-tabler icon-tabler-chevron-right ${styles.iconPaging}`}
              width={18}
              height={18}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
          </span>
        </div>
      </td>
    </tr>
  );
};

export default Pagination;
