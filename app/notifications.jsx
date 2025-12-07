import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';

async function createNotificationChannel() {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Canal Principal',
    importance: AndroidImportance.HIGH,
  });
  return channelId;
}


export async function scheduleLocalNotification(targetDate, notText) {
  const channelId = await createNotificationChannel();


  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: targetDate.getTime(),
  };

  // 2. Criar e agendar a notificação
  await notifee.createTriggerNotification(
    {
      title: `Hora de realizar a tarefa " ${notText}" `,
      body: 'A notificação da tarefa apareceu!',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    },
    trigger,
  );

  console.log('Notificação agendada para:', targetDate.toLocaleString());
}







export async function displayNowNotification() {
  const channelId = await createNotificationChannel();
  await notifee.requestPermission();
  await notifee.displayNotification({
    title: 'Notificação apareceu!',
    body: 'Notificação de teste para mostrar como fica',
    android: {
      channelId,
      smallIcon: 'ic_launcher', 
      pressAction: {
        id: 'default',
      },
    },
  });
}
