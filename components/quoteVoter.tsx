import {useMutation, useQuery} from "../convex/_generated/react";
import TopicVoter from "./topicVoter";

const QuoteVoter = () => {
  const incrementVotes = useMutation('voteForQuote')
  const quotes = useQuery("getQuotes") ?? []

  return <TopicVoter
    name={'quote'}
    topics={quotes.map((q) => ({
      disableVoting: false,
      ...q
    }))}
    addTopicMutation={useMutation('addQuote')}
    handleVote={(_id) => incrementVotes(_id, 1)}/>
}


export default QuoteVoter