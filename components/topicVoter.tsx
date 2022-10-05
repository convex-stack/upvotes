import {Id, TableNames} from "../convex/_generated/dataModel";
import {FormEvent, useState} from "react";
import styles from "../styles/Home.module.css";

type TopicVoterProps<TableName extends TableNames> = {
  name: string;
  title?: string;
  topics: {text: string, votes: number, disableVoting: boolean, _id: Id<TableName> }[];
  addTopicMutation: (topicText: string) => void;
  handleVote: (_id: Id<TableName>) => void;
}

const TopicVoter = <TableName extends TableNames,>({name, title, topics, addTopicMutation, handleVote}: TopicVoterProps<TableName>): JSX.Element => {
  const [newTopicText, setNewTopicText] = useState("");

  async function handleAddTopic(event: FormEvent) {
    event.preventDefault();
    setNewTopicText("");
    await addTopicMutation(newTopicText);
  }

  return (<div className={styles.voting_tab}>
    <h1 className={styles.title}>
      {title ?? name} Voter
    </h1>
    {topics.map(({text, votes, disableVoting, _id}) =>
      <div className={styles.quote} key={_id.id}>
        {text}
        <div>
          {votes}
          <button className={styles.button} disabled={disableVoting} style={{width: "auto"}} onClick={() => handleVote(_id)}> +1 </button>
        </div>
      </div>

    )}
    <form
      onSubmit={handleAddTopic}

    >
      <input
        value={newTopicText}
        onChange={event => setNewTopicText(event.target.value)}
        className="form-control w-50"
        placeholder={`New ${name}...`}
      />
      <input
        type="submit"
        value={`Add a ${name}!`}
        className={styles.button}
        disabled={!newTopicText}
      />
    </form>
  </div>)
}

export default TopicVoter;