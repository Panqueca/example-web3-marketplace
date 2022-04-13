import React from 'react'
import styled from 'styled-components'
import JobsMap from '../JobsMap'

const ListWrapper = styled.div`
  display: flex;
  width: 80%;
  margin: 20px auto;
  gap: 20px;
  flex-direction: column;
`
const JobDetails = styled.div`
  width: 50%;
  border-radius: 5px;
  border: 1px solid #ccc;
`

const JobsList = () => {
  const jobs = [
    {
      id: 1,
      title: 'Serviço oferecido',
      company: 'Rookau',
      location: 'Curitiba/PR',
      price: 'R$ 1000',
      time: '10 dias',
      description:
        'Estamos com uma oportunidade disponível em Curitiba, para atuar como Designer Gráfico na nossa área. Estamos com uma oportunidade disponível em Curitiba, para atuar como Designer Gráfico na nossa área.',
    },
    {
      id: 2,
      title: 'Designer de NFTs',
      company: 'Rogerio Mendes',
      location: 'Curitiba/PR',
      price: 'R$ 20.000',
      time: '15 dias',
      description:
        'Estamos com uma oportunidade disponível em Curitiba, para atuar como Designer Gráfico na nossa área. Estamos com uma oportunidade disponível em Curitiba, para atuar como Designer Gráfico na nossa área.',
    },
    {
      id: 3,
      title: 'Desenvolvedor de Smart Contracts',
      company: 'Rogerio Mendes',
      location: 'Curitiba/PR',
      price: 'R$ 20.000',
      time: '15 dias',
      description:
        'Estamos com uma oportunidade disponível em Curitiba, para atuar como Designer Gráfico na nossa área. Estamos com uma oportunidade disponível em Curitiba, para atuar como Designer Gráfico na nossa área.',
    },
  ]

  return (
    <ListWrapper>
      {jobs.map(jobInfo => {
        return (
          <JobsMap
            key={jobInfo.id}
            title={jobInfo.title}
            company={jobInfo.company}
            location={jobInfo.location}
            price={jobInfo.price}
            time={jobInfo.time}
            description={jobInfo.description}
          />
        )
      })}
      <JobDetails></JobDetails>
    </ListWrapper>
  )
}

export default JobsList
