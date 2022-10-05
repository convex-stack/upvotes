import {useMutation} from "../convex/_generated/react";
import TopicVoter from "./topicVoter";
import {BoatWithVotingInfo} from "../convex/getBoats";

type BoatVoterProps = {
  title: string;
  getBoats: () => BoatWithVotingInfo[]
}

const BoatVoter = ({title, getBoats}: BoatVoterProps) => {
  const incrementVotes = useMutation('voteForBoat')
  const boats = getBoats();

  return <TopicVoter
    name={'boat'}
    title={title}
    topics={boats}
    addTopicMutation={useMutation('addBoat')}
    handleVote={(_id) => incrementVotes(_id)}/>
}


export default BoatVoter