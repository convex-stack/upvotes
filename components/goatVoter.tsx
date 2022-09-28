import {useMutation, useQuery} from "../convex/_generated/react";
import TopicVoter from "./topicVoter";

const GoatVoter = () => {
  const incrementVotes = useMutation('voteForGoat')
  const goats = useQuery("getGoats") ?? []

  return <TopicVoter
    name={'goat'}
    topics={goats.map((g) =>  ( {
      votes: g.voters.length,
        ...g
    }))}
    addTopicMutation={useMutation('addGoat')}
    handleVote={(_id) => incrementVotes(_id)}/>
}


export default GoatVoter