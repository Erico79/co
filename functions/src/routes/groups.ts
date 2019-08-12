import { Router } from 'express';
import admin from '../initAdmin';

const router = Router();

router.post('/', async (req, res) => {
  const { name, no_of_members } = req.body;

  try {
    const snapshot = await admin.database().ref('/groups').push({
      name,
      no_of_members
    });

    res.send({group: { id: snapshot.key }});
  } catch(error) {
    res.status(500).send(error);
  }
});

export default router;
