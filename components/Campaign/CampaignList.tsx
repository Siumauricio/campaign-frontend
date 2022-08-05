import { Card, Flex, Link, Text } from 'zorotek-ui';
import NextLink from 'next/link';
import { useState } from 'react';

interface CampaignList {
  manager: string;
  minimumContribution: number;
  complete: boolean;
  approvalCount: number;
  approvers?: Array<string>;
}
interface Props {
  campaigns: Array<string>;
}

export const CampaignList: React.FunctionComponent<Props> = ({
  campaigns,
}) => {
  return (
    <Flex justifyContent={'center'}>
      <Flex flexDirection="column">
        <Text weight={'semibold'} as="h2" display size="xs">
          Open Campaigns
        </Text>

        <Flex
          gap={15}
          flexDirection="column"
          css={{ pt: '$3', width: 'fit-content' }}
        >
          {campaigns.map((campaign, i) => (
            <Card
              key={i}
              css={{ minWidth: 'fit-content', gap: 8 }}
              hoverable
            >
              <Card.Header>
                <Text css={{ wordBreak: 'break-all' }}>
                  Campaign Contract: {campaign}
                </Text>
              </Card.Header>
              <Card.Content>
                <NextLink href={`/campaigns/${campaign}`}>
                  <Link color={'blue'} colored icon>
                    View Campaign
                  </Link>
                </NextLink>
              </Card.Content>
            </Card>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
