import * as React from 'react';
import styled from 'styled-components';
import { Button, Card, Container, Dropdown, List, Segment } from 'semantic-ui-react';
import { useEffect, useState } from 'react';

import {
  BASE_URL,
  jobsInfo,
  minutes,
  seconds,
  hours,
  daysOfTheWeek,
  mobile,
} from '../../services/constants';

import getServerSideProps from '../../services/Api';

const Jobs = ({ data }) => {
  const [company, setCompany] = useState('');
  const [companiesOptions, setCompaniesOptions] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobTimeStamp, setJobTimeStamp] = useState(0);
  const [showCards, setShowCards] = useState(true);

  useEffect(() => {
    async function load() {
      const getData = await data;
      const newSet = new Set();
      for (let item of getData) {
        newSet.add(item.companyName);
      }
      const getCompanies = [...newSet];
      const teste = getCompanies.map((company) => ({
        key: company,
        text: company,
        value: company,
      }));
      setCompaniesOptions(teste);
    }
    load();
  }, [data]);

  useEffect(() => {
    async function load() {
      const getData = await data;
      console.log(getData);
      const filterJob = getData
        .filter(({ companyName }) => (company !== '' ? companyName === company : true))
        .filter((job) =>
          jobTimeStamp ? new Date(job.OBJpostingDate).getTime() > jobTimeStamp : true
        );
      setFilteredJobs(filterJob);
    }
    load();
  }, [data, company, jobTimeStamp]);

  const time = () => new Date().getTime() - 1000 * minutes * seconds * hours * week;

  return (
    <>
      {data !== undefined && (
        <StyledForContainer>
          <StyledForHeader>
            <StyledForDropdown
              placeholder="Company"
              options={[
                {
                  key: '',
                  text: '',
                  value: '',
                },
              ].concat(companiesOptions)}
              onChange={(event, data) => setCompany(data.value)}
              value={company}
            />
            <Button
              toggle
              active={jobTimeStamp !== undefined}
              onClick={() => setJobTimeStamp(jobTimeStamp === undefined ? 0 : time())}
            >
              Show last 7 days
            </Button>
            <Button toggle active={showCards} onClick={() => setShowCards(!showCards)}>
              Show cards
            </Button>
            <Button
              onClick={() => {
                setCompany('');
                setJobTimeStamp(0);
                setShowCards(true);
              }}
            >
              Reset
            </Button>
          </StyledForHeader>
          {showCards ? (
            <StyledForCards itemsPerRow={4} stackable>
              {filteredJobs !== undefined &&
                filteredJobs.slice(0, 10).map((job) => {
                  return (
                    <StyledForCard key={job.jobId}>
                      <Card.Content>
                        <Card.Header>{job.jobTitle}</Card.Header>
                        <Card.Meta>
                          {job.companyName}
                          <br />
                          {job.postedDate}
                        </Card.Meta>
                        <Card.Description>{job.shortDesc}...</Card.Description>
                      </Card.Content>
                    </StyledForCard>
                  );
                })}
            </StyledForCards>
          ) : (
            <List divided relaxed>
              {filteredJobs !== undefined &&
                filteredJobs.slice(0, 10).map((job) => {
                  return (
                    <List.Item key={job.jobId}>
                      <List.Content>
                        <List.Header>{job.jobTitle}</List.Header>
                        <List.Description>{job.shortDesc}...</List.Description>
                      </List.Content>
                    </List.Item>
                  );
                })}
            </List>
          )}
        </StyledForContainer>
      )}
    </>
  );
};

