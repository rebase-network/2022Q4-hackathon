<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';

import { useTaskStore } from '@/stores/taskStore';
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
const taskStore = useTaskStore();
const userStore = useUserStore();
const { profile } = storeToRefs(userStore);

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits<{ (e: "update:visible"): void }>();
const checkedModel = useVModel(props, "visible", emit);

// const visible = ref(props.visible);
const validator = toFormValidator(
  // 定义表单的验证规则
  zod.object({
    task_name: zod
      .string({
        required_error: "Please enter your task name",
        invalid_type_error: "The task name type errors",
      })
      .regex(/^\w{2,19}$/, "The length of daoname must be 3 to 20"),
    objective: zod
      .string({
        required_error: "Please enter task objective",
        invalid_type_error: "The task objective type errors",
      })
      .regex(/^\w{19,199}$/, "The length of daoname must be 20 to 200"),
    key_result: zod
      .string({
        required_error: "Please enter task key_result",
        invalid_type_error: "The task key_result type errors",
      })
      .regex(/^\w{9,49}$/, "The length of mission must be 10 to 50"),
    reward: zod
      .number({
        // required_error: "Please enter your DAO theme_color",
        // invalid_type_error: "The task rewardsreward type errors",
      }),
    deadline: zod
      .string({
        required_error: "Please enter your Task deadline",
        invalid_type_error: "The Task deadline type errors",
      })
  })
);

const { handleSubmit, values, setFieldValue, validate } = useForm({
  validationSchema: validator,
  initialValues: {
    task_name: "",
    objective: "",
    key_result: "",
    reward: 20,
    deadline: 2000
  },
});

const onSubmit = handleSubmit(async (formValues) => {
  // await taskStore.createTask({ action: 'create', task_id: Math.random() * 100, wallet_address: (profile.value.result.wallet_address as string), ...formValues })
  if (taskStore.taskList?.result !== undefined) {
    taskStore.taskList.result.push({ action: 'create', task_id: Math.random() * 100, wallet_address: (profile.value.result.wallet_address as string), ...formValues })
  }
  if (formValues) {
    checkedModel.value = false;
  }

});

</script>

<template>
  <div>
    <FreeDialog title="Create Task" v-model:visible="checkedModel">
      <template #body>
        <Form @submit.prevent="onSubmit">
          <Field name="task_name" v-slot="{ field }">
            <h4>Task name</h4>
            <input type="text" v-bind="field" class="input_text">
            <ErrorMessage name="task_name" v-slot="{ message }">
              <div class="error text-red-500">
                <i class="iconfont icon-warning"></i> {{ message }}
              </div>
            </ErrorMessage>
          </Field>
          <Field name="objective" v-slot="{ field }">
            <h4>Objective</h4>
            <input type="text" v-bind="field" class="input_text area_text">
            <ErrorMessage name="objective" v-slot="{ message }">
              <div class="error text-red-500">
                <i class="iconfont icon-warning"></i> {{ message }}
              </div>
            </ErrorMessage>
          </Field>
          <Field name="key_result" v-slot="{ field }">
            <h4>Key results</h4>
            <input type="text" v-bind="field" class="input_text">
            <ErrorMessage name="key_result" v-slot="{ message }">
              <div class="error text-red-500">
                <i class="iconfont icon-warning"></i> {{ message }}
              </div>
            </ErrorMessage>
          </Field>
          <div class="task_over">
            <Field name="reward" v-slot="{ field }">
              <div>
                <div>
                  <h4>reward</h4>
                  <input type="text" v-bind="field" class="input_text">
                </div>
                <ErrorMessage name="reward" v-slot="{ message }">
                  <div class="error text-red-500">
                    <i class="iconfont icon-warning"></i> {{ message }}
                  </div>
                </ErrorMessage>
              </div>
            </Field>
            <Field name="deadline" v-slot="{ field }">
              <div>
                <div>
                  <h4>deadline</h4>
                  <input type="text" v-bind="field" class="input_text">
                </div>
                <ErrorMessage name="deadline" v-slot="{ message }">
                  <div class="error text-red-500">
                    <i class="iconfont icon-warning"></i> {{ message }}
                  </div>
                </ErrorMessage>
              </div>
            </Field>
          </div>
          <div class="task_foot">
            <FreeBtn op_type="submit">Createt Task</FreeBtn>
            <FreeBtn type="light" @click="checkedModel = false">Cancel</FreeBtn>
          </div>
        </Form>
      </template>
    </FreeDialog>

  </div>
</template>

<style scoped lang="less">
h4 {
  font-weight: 600;
}

.input_text {
  width: 100%;
  height: 40px;
  padding: 12pz;
  border-radius: 4px;
  border: solid 1px #292422;
  background-color: #fff;
  margin: 5px 0 15px;
}

.area_text {
  height: 80px;
}

.task_over {
  display: flex;
  justify-content: space-between;
}

.task_foot {
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
}
</style>
