import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { fetchVisits } from '../api/visits';

export default function VisitsList({ uid }) {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    fetchVisits(uid)
      .then(setVisits)
      .catch(console.error);
  }, [uid]);

  return (
    <FlatList
      data={visits}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <Text>{item.timestamp}</Text>}
    />
  );
}