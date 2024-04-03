const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = 'Add your supabase URL'
const supabaseAnonKey = 'Add your supabase anon key'

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const getTasks = async () => {
  try {
    const { data, error } = await supabase.from('tasks').select('*').order('tid', { ascending: true });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

const createTask = async (body) => {
  try {
    const { name, course, due_date, stage } = body;
    const { data, error } = await supabase.from('tasks').insert({ name: name, course, due_date, stage });
    if (error) throw error;
    return `A new task has been added: ${name}`;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (id) => {
  try {
    const { error } = await supabase.from('tasks').delete().eq('tid', id);
    if (error) throw error;
    return `Task deleted with ID: ${id}`;
  } catch (error) {
    throw error;
  }
};

const updateStage = async (body) => {
  try {
    const { id, stage } = body;
    const { error } = await supabase.from('tasks').update({ stage }).eq('tid', id);
    if (error) throw error;
    return `Task changed with ID: ${id}`;
  } catch (error) {
    throw error;
  }
};

const updateTask = async (body) => {
  try {
    const { id, column, change } = body;
    const updates = { [column]: change };
    const { error } = await supabase.from('tasks').update(updates).eq('tid', id);
    if (error) throw error;
    return `Task changed with ID: ${id}.`;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateStage,
  updateTask
};
