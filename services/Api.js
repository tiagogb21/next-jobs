export const getServerSideProps = async () => {
  const res = await axios.post(BASE_URL, jobsInfo);
  return {
    props: {
      data: res.data.jobs,
    },
  };
};
