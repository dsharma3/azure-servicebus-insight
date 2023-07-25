import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ServiceBusClient,
  ServiceBusAdministrationClient,
  ServiceBusReceivedMessage,
} from '@azure/service-bus';
import config from '../../config/default';
import Long from "long";
import { isTypedArray } from 'util/types';

@Injectable()
export class MessagesService {
  async getMessagesWithRuntimeProperties(connectionString) {
    console.log(connectionString);
    const serviceBusAdministrationClient = new ServiceBusAdministrationClient(
      connectionString,
    );

    const queueData = [];
    const queuesRuntimeProperties =
      serviceBusAdministrationClient.listQueuesRuntimeProperties();
    for await (const queueRuntimeProperty of queuesRuntimeProperties) {
      console.log('Inside queue ' + queueRuntimeProperty);
      queueData.push(queueRuntimeProperty);
    }
    return queueData;
  }

  async peekMessages(connectionString, queueName) {
    const serviceBusAdministrationClient = new ServiceBusAdministrationClient(
      connectionString,
    );

    if (await serviceBusAdministrationClient.queueExists(queueName)) {
      const serviceBusClient = new ServiceBusClient(connectionString);

      const queue = await serviceBusClient.createReceiver(queueName);

      return queue.peekMessages(200);
    }
    throw new BadRequestException('Queue ' + queueName + " doesn't exist.");
  }

  async receiveMessages(
    connectionString,
    queueName,
    sequenceNumbers: Long | Long[],
  ) {
    const serviceBusAdministrationClient = new ServiceBusAdministrationClient(
      connectionString,
    );
    console.log('sequenceNumbers' + Array.isArray(sequenceNumbers));

    console.log(Long?.fromString('1000023'));
    if (!Long?.isLong(sequenceNumbers)) {
      console.log('This is testing');
      //throw new BadRequestException('This is testing');
    } else {
      console.log('This is long');
    }
    if (await serviceBusAdministrationClient.queueExists(queueName)) {
      const serviceBusClient = new ServiceBusClient(connectionString);
      const queue = await serviceBusClient.createReceiver(queueName);
      await queue.receiveDeferredMessages(sequenceNumbers);
    }
    throw new BadRequestException('Queue ' + queueName + " doesn't exist.");
  }

  async moveToDeadLetteredQueue(
    connectionString,
    queueName,
    sequenceNumbers: Long[],
  ) {
    const serviceBusAdministrationClient = new ServiceBusAdministrationClient(
      connectionString,
    );

    if (await serviceBusAdministrationClient.queueExists(queueName)) {
      const serviceBusClient = new ServiceBusClient(connectionString);
      const queueReceiver = await serviceBusClient.createReceiver(queueName);
      const serviceBusMessages = await queueReceiver.receiveDeferredMessages(
        sequenceNumbers,
      );
      for (const message of serviceBusMessages) {
        await queueReceiver.deadLetterMessage(message);
      }
    }
    throw new BadRequestException('Queue ' + queueName + " doesn't exist.");
  }

  async createMessages() {
    // Passwordless credential
    const credential = null;

    // name of the queue
    const queueName = 'myqueue';

    const messages = [
      { body: 'Albert Einstein' },
      { body: 'Werner Heisenberg' },
      { body: 'Marie Curie' },
      { body: 'Steven Hawking' },
      { body: 'Isaac Newton' },
      { body: 'Niels Bohr' },
      { body: 'Michael Faraday' },
      { body: 'Galileo Galilei' },
      { body: 'Johannes Kepler' },
      { body: 'Nikolaus Kopernikus' },
    ];

    async function main() {
      // create a Service Bus client using the passwordless authentication to the Service Bus namespace
      const sbClient = new ServiceBusClient(
        config.server.serviceBusConnectionString,
        credential,
      );

      // createSender() can also be used to create a sender for a topic.
      const sender = sbClient.createSender(queueName);

      try {
        // Tries to send all messages in a single batch.
        // Will fail if the messages cannot fit in a batch.
        // await sender.sendMessages(messages);

        // create a batch object
        let batch = await sender.createMessageBatch();
        for (let i = 0; i < messages.length; i++) {
          // for each message in the array

          // try to add the message to the batch
          if (!batch.tryAddMessage(messages[i])) {
            // if it fails to add the message to the current batch
            // send the current batch as it is full
            await sender.sendMessages(batch);

            // then, create a new batch
            batch = await sender.createMessageBatch();

            // now, add the message failed to be added to the previous batch to this batch
            if (!batch.tryAddMessage(messages[i])) {
              // if it still can't be added to the batch, the message is probably too big to fit in a batch
              throw new Error('Message too big to fit in a batch');
            }
          }
        }

        // Send the last created batch of messages to the queue
        await sender.sendMessages(batch);

        console.log(`Sent a batch of messages to the queue: ${queueName}`);

        // Close the sender
        await sender.close();
      } finally {
        await sbClient.close();
      }
    }

    // call the main function
    main().catch((err) => {
      console.log('Error occurred: ', err);
      process.exit(1);
    });
  }
}
