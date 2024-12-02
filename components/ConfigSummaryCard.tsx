import React from 'react';
import { Card, Text, Chip } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

type ConfigSummaryCardProps = {
  label: string;
  tags: string[];
  dateCreated: string;
  illustrationCount: number;
  onPress: () => void;
};

const ConfigSummaryCard: React.FC<ConfigSummaryCardProps> = ({ label, tags, dateCreated, illustrationCount, onPress }) => {
  const formattedDate = new Date(dateCreated).toLocaleDateString();

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <Text variant="titleMedium">{label}</Text>
        <Text variant="bodyMedium">Created on: {formattedDate}</Text>
        <Text variant="bodyMedium">Illustrations: {illustrationCount}</Text>
        <View style={styles.tagContainer}>
          {tags.map((tag, index) => (
            <Chip key={index} style={styles.tag}>{tag}</Chip>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    marginRight: 4,
    marginBottom: 4,
  },
});

export default ConfigSummaryCard;
